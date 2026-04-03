from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    import flask_migrate

    from extensions.ext_database import db

    flask_migrate.Migrate(app, db)
