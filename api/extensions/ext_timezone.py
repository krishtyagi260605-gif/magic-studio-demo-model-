import os
import time

from magic_studio_app import MagicStudioApp


def init_app(app: MagicStudioApp):
    os.environ["TZ"] = "UTC"
    # windows platform not support tzset
    if hasattr(time, "tzset"):
        time.tzset()
