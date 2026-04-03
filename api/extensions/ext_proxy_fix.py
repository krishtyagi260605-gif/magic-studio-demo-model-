from configs import magic_studio_config
from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    if magic_studio_config.RESPECT_XFORWARD_HEADERS_ENABLED:
        from werkzeug.middleware.proxy_fix import ProxyFix

        app.wsgi_app = ProxyFix(app.wsgi_app, x_port=1)  # type: ignore[method-assign]
