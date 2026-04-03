from __future__ import annotations

from typing import Literal

from graphon.entities.base_node_data import BaseNodeData
from pydantic import Field


class ApprovalNodeData(BaseNodeData):
    """
    Magic Studio: Approval Node Data
    """
    approval_type: Literal["single", "multi"] = Field("single", description="Whether one or all must approve.")
    approvers: list[str] = Field(default_factory=list, description="IDs of users who can approve.")
    timeout_action: Literal["approve", "reject", "pause"] = Field("pause", description="What to do if timeout occurs.")
    timeout_seconds: int = Field(3600, description="How long to wait for approval.")
    notify_by_email: bool = Field(True, description="Whether to send email notifications.")
