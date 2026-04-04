"""Semantic convention shortcuts for Magic Studio spans."""

from .magic_studio import MagicStudioSpanAttributes
from .gen_ai import ChainAttributes, GenAIAttributes, LLMAttributes, RetrieverAttributes, ToolAttributes

__all__ = [
    "ChainAttributes",
    "MagicStudioSpanAttributes",
    "GenAIAttributes",
    "LLMAttributes",
    "RetrieverAttributes",
    "ToolAttributes",
]
