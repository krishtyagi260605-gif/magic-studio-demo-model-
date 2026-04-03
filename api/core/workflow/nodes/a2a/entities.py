from __future__ import annotations

from typing import Any

from graphon.entities.base_node_data import BaseNodeData
from pydantic import Field


class A2ANodeData(BaseNodeData):
    """
    Agent-to-Agent (A2A) Node Data
    """

    target_app_id: str = Field(..., description="ID of the target app (agent or workflow) to trigger.")
    target_node_id: str | None = Field(None, description="Optional target node ID within the child app (for sub-node entry).")
    input_mapping: dict[str, str] = Field(default_factory=dict, description="Mapping internal variables to child app inputs.")
    output_mapping: dict[str, str] = Field(default_factory=dict, description="Mapping child app outputs back to internal variables.")
    is_async: bool = Field(False, description="Whether to wait for target completion (Sync) or fire-and-forget (Async).")
    timeout_seconds: float = Field(60.0, description="Max time to wait for Sync execution.")
