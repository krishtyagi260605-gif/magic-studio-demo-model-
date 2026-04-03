from core.hosting_configuration import HostingConfiguration

hosting_configuration = HostingConfiguration()


from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    hosting_configuration.init_app(app)
