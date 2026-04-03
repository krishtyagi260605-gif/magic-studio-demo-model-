"""
Model Fallback Chain — Magic Studio Enhancement

Provides a fallback mechanism for model invocations. If the primary model
fails (rate limit, timeout, or error), the system automatically retries
with the next model in a configured fallback chain.

Copyright (c) 2026 Krish Tyagi — Magic Studio
"""

from __future__ import annotations

import logging
import time
from dataclasses import dataclass, field
from typing import Any, TypeVar

logger = logging.getLogger(__name__)

T = TypeVar("T")


@dataclass
class FallbackModelConfig:
    """Configuration for a single model in the fallback chain."""

    provider: str
    model_name: str
    max_retries: int = 1
    timeout_seconds: float = 60.0
    priority: int = 0


@dataclass
class ModelFallbackChain:
    """
    A chain of models to try in order of priority.

    When the primary model fails, the system automatically tries the next
    model in the chain until one succeeds or all models are exhausted.

    Usage:
        chain = ModelFallbackChain(models=[
            FallbackModelConfig(provider="openai", model_name="gpt-4o"),
            FallbackModelConfig(provider="anthropic", model_name="claude-3-5-sonnet"),
            FallbackModelConfig(provider="google", model_name="gemini-2.5-pro"),
        ])

        result = chain.invoke(model_runner, prompt="Hello, world!")
    """

    models: list[FallbackModelConfig] = field(default_factory=list)
    _execution_log: list[dict[str, Any]] = field(default_factory=list, repr=False)

    def __post_init__(self) -> None:
        """Sort models by priority (lower number = higher priority)."""
        self.models.sort(key=lambda m: m.priority)

    @property
    def execution_log(self) -> list[dict[str, Any]]:
        """Get the execution log from the last invoke call."""
        return list(self._execution_log)

    def invoke(
        self,
        runner_fn: Any,
        *args: Any,
        **kwargs: Any,
    ) -> Any:
        """
        Try each model in the chain until one succeeds.

        Args:
            runner_fn: A callable that accepts (provider, model_name, *args, **kwargs)
                      and returns the model response.
            *args: Additional positional arguments to pass to the runner.
            **kwargs: Additional keyword arguments to pass to the runner.

        Returns:
            The response from the first successful model invocation.

        Raises:
            ModelFallbackExhaustedError: If all models in the chain fail.
        """
        self._execution_log = []
        last_error: Exception | None = None

        for model_config in self.models:
            for attempt in range(1, model_config.max_retries + 1):
                start_time = time.monotonic()
                try:
                    logger.info(
                        "Trying model %s/%s (attempt %d/%d)",
                        model_config.provider,
                        model_config.model_name,
                        attempt,
                        model_config.max_retries,
                    )

                    result = runner_fn(
                        model_config.provider,
                        model_config.model_name,
                        *args,
                        **kwargs,
                    )

                    duration = time.monotonic() - start_time
                    self._execution_log.append({
                        "provider": model_config.provider,
                        "model": model_config.model_name,
                        "attempt": attempt,
                        "status": "success",
                        "duration_seconds": round(duration, 3),
                    })

                    logger.info(
                        "Model %s/%s succeeded in %.3fs",
                        model_config.provider,
                        model_config.model_name,
                        duration,
                    )
                    return result

                except Exception as e:
                    duration = time.monotonic() - start_time
                    last_error = e
                    self._execution_log.append({
                        "provider": model_config.provider,
                        "model": model_config.model_name,
                        "attempt": attempt,
                        "status": "error",
                        "error": str(e),
                        "error_type": type(e).__name__,
                        "duration_seconds": round(duration, 3),
                    })

                    logger.warning(
                        "Model %s/%s failed (attempt %d/%d): %s",
                        model_config.provider,
                        model_config.model_name,
                        attempt,
                        model_config.max_retries,
                        str(e),
                    )

        raise ModelFallbackExhaustedError(
            f"All {len(self.models)} models in the fallback chain failed. "
            f"Last error: {last_error}",
            execution_log=self._execution_log,
        )


class ModelFallbackExhaustedError(Exception):
    """Raised when all models in the fallback chain have failed."""

    def __init__(self, message: str, execution_log: list[dict[str, Any]] | None = None) -> None:
        super().__init__(message)
        self.execution_log = execution_log or []

    def __repr__(self) -> str:
        return f"ModelFallbackExhaustedError(models_tried={len(self.execution_log)})"
