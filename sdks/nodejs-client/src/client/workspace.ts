import { MagicStudioClient } from "./base";
import type { WorkspaceModelType, WorkspaceModelsResponse } from "../types/workspace";
import type { MagicStudioResponse } from "../types/common";
import { ensureNonEmptyString } from "./validation";

export class WorkspaceClient extends MagicStudioClient {
  async getModelsByType(
    modelType: WorkspaceModelType
  ): Promise<MagicStudioResponse<WorkspaceModelsResponse>> {
    ensureNonEmptyString(modelType, "modelType");
    return this.http.request({
      method: "GET",
      path: `/workspaces/current/models/model-types/${modelType}`,
    });
  }
}
