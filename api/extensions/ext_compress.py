from configs import magic_studio_config
from magic_studio_app import MagicStudioApp


def is_enabled() -> bool:
    return magic_studio_config.API_COMPRESSION_ENABLED


def init_app(app: MagicStudioApp):
    from flask_compress import Compress

    compress = Compress()
    compress.init_app(app)
