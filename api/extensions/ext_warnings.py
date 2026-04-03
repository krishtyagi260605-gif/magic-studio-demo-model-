from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    import warnings

    warnings.simplefilter("ignore", ResourceWarning)
