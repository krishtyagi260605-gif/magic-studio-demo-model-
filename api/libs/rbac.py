from functools import wraps
from flask import abort
from flask_login import current_user
from models.account import TenantAccountRole

def roles_required(*roles):
    """
    Magic Studio RBAC Decorator
    
    Ensures the current user has one of the required roles in the current tenant.
    Usage:
        @roles_required(TenantAccountRole.ADMIN, TenantAccountRole.OWNER)
        def get(self):
            ...
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                abort(401)
            
            user_role = current_user.current_role
            if not user_role or user_role not in roles:
                # If required roles are privileged and user is not, or user is just a VIEWER
                abort(403, description="You do not have the required permissions for this action.")
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def editor_required(f):
    """Shortcut for roles that can edit (OWNER, ADMIN, EDITOR)"""
    return roles_required(TenantAccountRole.OWNER, TenantAccountRole.ADMIN, TenantAccountRole.EDITOR)(f)

def admin_required(f):
    """Shortcut for administrative roles (OWNER, ADMIN)"""
    return roles_required(TenantAccountRole.OWNER, TenantAccountRole.ADMIN)(f)

def viewer_allowed(f):
    """Explicitly allow all roles including VIEWER (mostly for documentation)"""
    return roles_required(
        TenantAccountRole.OWNER, 
        TenantAccountRole.ADMIN, 
        TenantAccountRole.EDITOR, 
        TenantAccountRole.NORMAL, 
        TenantAccountRole.VIEWER
    )(f)
