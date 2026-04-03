from configs import magic_studio_config
from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    return # Disable Sentry for Magic Studio
    if magic_studio_config.SENTRY_DSN:
        import sentry_sdk
        from graphon.model_runtime.errors.invoke import InvokeRateLimitError
        from sentry_sdk.integrations.celery import CeleryIntegration
        from sentry_sdk.integrations.flask import FlaskIntegration
        from werkzeug.exceptions import HTTPException

        try:
            from langfuse._utils import parse_error

            _langfuse_error_response = parse_error.defaultErrorResponse
        except (ImportError, AttributeError):
            _langfuse_error_response = (
                "Unexpected error occurred. Please check your request"
                " and contact support: https://langfuse.com/support."
            )

        def before_send(event, hint):
            if "exc_info" in hint:
                _, exc_value, _ = hint["exc_info"]
                if _langfuse_error_response in str(exc_value):
                    return None

            return event

        sentry_sdk.init(
            dsn=magic_studio_config.SENTRY_DSN,
            integrations=[FlaskIntegration(), CeleryIntegration()],
            ignore_errors=[
                HTTPException,
                ValueError,
                FileNotFoundError,
                InvokeRateLimitError,
                _langfuse_error_response,
            ],
            traces_sample_rate=magic_studio_config.SENTRY_TRACES_SAMPLE_RATE,
            profiles_sample_rate=magic_studio_config.SENTRY_PROFILES_SAMPLE_RATE,
            environment=magic_studio_config.DEPLOY_ENV,
            release=f"dify-{magic_studio_config.project.version}-{magic_studio_config.COMMIT_SHA}",
            before_send=before_send,
        )
