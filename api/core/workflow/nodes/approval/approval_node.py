from __future__ import annotations

import logging
import time
from typing import TYPE_CHECKING, Any, Generator

from graphon.enums import BuiltinNodeTypes, WorkflowNodeExecutionStatus
from graphon.node_events import NodeEventBase, NodeRunResult
from graphon.nodes.base.node import Node

from .entities import ApprovalNodeData

if TYPE_CHECKING:
    from graphon.entities import GraphInitParams
    from graphon.runtime import GraphRuntimeState

logger = logging.getLogger(__name__)


class ApprovalNode(Node[ApprovalNodeData]):
    """
    Magic Studio: Approval Node (HITL)
    
    Allows workflows to pause for manual human approval.
    By Krish Tyagi — Magic Studio
    """
    node_type = "builtin_node:approval"
    
    @classmethod
    def version(cls) -> str:
        return "1"

    def __init__(
        self,
        id: str,
        config: dict[str, Any],
        graph_init_params: GraphInitParams,
        graph_runtime_state: GraphRuntimeState,
    ) -> None:
        super().__init__(
            id=id,
            config=config,
            graph_init_params=graph_init_params,
            graph_runtime_state=graph_runtime_state,
        )

    def run(self) -> Generator[NodeEventBase, None, NodeRunResult]:
        """
        Execute the Approval node.
        
        This node will pause the workflow until an external event (Approval) is received.
        """
        node_data = self.node_data
        
        # 1. Check if we are resuming from an approval event
        # Logic to check the variable pool for internal 'approval_result'
        approval_result = self.graph_runtime_state.variable_pool.get("magic:approval_result")
        
        if approval_result:
            logger.info("Resuming approval node with result: %s", approval_result)
            return NodeRunResult(
                status=WorkflowNodeExecutionStatus.SUCCEEDED,
                outputs={"approved": approval_result == "approve", "comment": "resumed from HITL"},
                metadata={"approver_id": "resumed"}
            )

        # 2. If no result, pause the workflow
        logger.info("Approval node %s pausing workflow for HITL.", self.id)
        
        # Return RUNNING status which should be handled by the engine to pause
        # Actually, in some versions, this is done by returning a specific status.
        return NodeRunResult(
            status=WorkflowNodeExecutionStatus.RUNNING,
            metadata={"hitl": True, "approval_id": "approval_" + self.id}
        )
