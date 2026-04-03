from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    from events import event_handlers  # noqa: F401 # pyright: ignore[reportUnusedImport]
