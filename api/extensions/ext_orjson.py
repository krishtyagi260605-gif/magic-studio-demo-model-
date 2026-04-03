from flask_orjson import OrjsonProvider

from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    """Initialize Flask-Orjson extension for faster JSON serialization"""
    app.json = OrjsonProvider(app)
