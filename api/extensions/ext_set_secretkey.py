from configs import magic_studio_config
from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    app.secret_key = magic_studio_config.SECRET_KEY
