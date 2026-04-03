from core.extension.extension import Extension
from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    code_based_extension.init()


code_based_extension = Extension()
