from __future__ import annotations

import logging
import time
from typing import TYPE_CHECKING, Any, Generator

from graphon.enums import BuiltinNodeTypes, WorkflowNodeExecutionStatus
from graphon.node_events import NodeEventBase, NodeRunResult
from graphon.nodes.base.node import Node

from core.app.entities.app_invoke_entities import DifyRunContext

from .entities import A2ANodeData

if TYPE_CHECKING:
    from graphon.entities import GraphInitParams
    from graphon.runtime import GraphRuntimeState

logger = logging.getLogger(__name__)


class A2ANode(Node[A2ANodeData]):
    """
    Magic Studio: Agent-to-Agent (A2A) Protocol Node
    
    Facilitates inter-agent and inter-workflow communication.
    By Krish Tyagi — Magic Studio
    """
    node_type = "builtin_node:a2a"  # Custom node type for Magic Studio
    
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
        Execute the A2A call.
        """
        node_data = self.node_data
        start_time = time.monotonic()
        
        # 1. Prepare inputs based on mapping
        mapped_inputs = {}
        for source, target in node_data.input_mapping.items():
            mapped_inputs[target] = self.graph_runtime_state.variable_pool.get(source)

        logger.info(
            "A2A triggering target app %s (async=%s)",
            node_data.target_app_id,
            node_data.is_async
        )

        try:
            # 2. Trigger the target agent/workflow
            # This is a simplified mock for the protocol implementation
            # In a real system, this would call the WorkflowRunner or AppRunner
            result_data = {
                "status": "success",
                "message": f"Successfully triggered target {node_data.target_app_id}",
                "execution_id": "a2a_exec_" + str(int(time.time()))
            }
            
            if not node_data.is_async:
                # Mock wait for completion
                time.sleep(0.5) 

            # 3. Handle outputs based on mapping
            outputs = {}
            for child_out, internal_in in node_data.output_mapping.items():
                outputs[internal_in] = result_data.get(child_out)

            duration = time.monotonic() - start_time
            
            return NodeRunResult(
                status=WorkflowNodeExecutionStatus.SUCCEEDED,
                outputs=outputs,
                metadata={
                    "duration": duration,
                    "target_app_id": node_data.target_app_id,
                    "execution_id": result_data.get("execution_id")
                }
            )

        except Exception as e:
            logger.error("A2A protocol failed: %s", str(e))
            return NodeRunResult(
                status=WorkflowNodeExecutionStatus.FAILED,
                error=f"A2A trigger failed: {str(e)}"
            )
