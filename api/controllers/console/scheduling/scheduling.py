from flask_restx import Resource, fields, marshal
from flask_login import current_user
from sqlalchemy.orm import Session
from extensions.ext_database import db
from services.trigger.schedule_service import ScheduleService
from controllers.console import api
from controllers.console.wraps import account_initialization_required, setup_required
from libs.rbac import admin_required

class SchedulingTaskFields(fields.Raw):
    def format(self, value):
        return value.strftime('%Y-%m-%d %H:%M:%S') if value else None

scheduling_task_fields = {
    'id': fields.String,
    'app_id': fields.String,
    'node_id': fields.String,
    'cron_expression': fields.String,
    'timezone': fields.String,
    'next_run_at': SchedulingTaskFields,
    'created_at': SchedulingTaskFields,
    'updated_at': SchedulingTaskFields,
}

class SchedulingTasksApi(Resource):
    @setup_required
    @account_initialization_required
    @admin_required
    def get(self):
        """
        Magic Studio Intelligent Scheduling Dashboard API
        List all scheduled tasks for the current workspace.
        """
        tenant_id = current_user.current_tenant_id
        
        with Session(db.engine) as session:
            tasks = ScheduleService.get_scheduled_tasks(session, tenant_id)
            
            return {
                'data': marshal(tasks, scheduling_task_fields),
                'count': len(tasks)
            }

api.add_resource(SchedulingTasksApi, '/scheduling/tasks')
