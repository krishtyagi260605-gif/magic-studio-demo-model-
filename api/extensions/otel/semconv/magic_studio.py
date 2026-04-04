"""Magic Studio semantic convention definitions."""


class MagicStudioSpanAttributes:
    """Attribute names for Magic Studio-specific spans."""

    APP_ID = "magic_studio.app_id"
    """Application identifier."""

    TENANT_ID = "magic_studio.tenant_id"
    """Tenant identifier."""

    USER_TYPE = "magic_studio.user_type"
    """User type, e.g. Account, EndUser."""

    STREAMING = "magic_studio.streaming"
    """Whether streaming response is enabled."""

    WORKFLOW_ID = "magic_studio.workflow_id"
    """Workflow identifier."""

    INVOKE_FROM = "magic_studio.invoke_from"
    """Invocation source, e.g. SERVICE_API, WEB_APP, DEBUGGER."""

    INVOKED_BY = "magic_studio.invoked_by"
    """Invoked by, e.g. end_user, account, user."""

    USAGE_INPUT_TOKENS = "gen_ai.usage.input_tokens"
    """Number of input tokens (prompt tokens) used."""

    USAGE_OUTPUT_TOKENS = "gen_ai.usage.output_tokens"
    """Number of output tokens (completion tokens) generated."""

    USAGE_TOTAL_TOKENS = "gen_ai.usage.total_tokens"
    """Total number of tokens used."""
