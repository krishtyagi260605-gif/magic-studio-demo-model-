from flask_restx import Resource

from configs import magic_studio_config
from controllers.service_api import service_api_ns


@service_api_ns.route("/")
class IndexApi(Resource):
    def get(self):
        return {
            "welcome": "Dify OpenAPI",
            "api_version": "v1",
            "server_version": magic_studio_config.project.version,
        }
