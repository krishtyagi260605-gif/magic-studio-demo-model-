from __future__ import annotations

from typing import TYPE_CHECKING

from flask import Flask

if TYPE_CHECKING:
    from extensions.ext_login import MagicStudioLoginManager


class MagicStudioApp(Flask):
    """Flask application type with Magic Studio-specific extension attributes."""

    login_manager: MagicStudioLoginManager
