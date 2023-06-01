from sentry_sdk import capture_exception
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import *


db = SQLAlchemy()
migrate = Migrate()

class BaseDbModel():
    
    # Adding is_deleted to keep record of deleted items in database  
    is_deleted = db.Column(db.Boolean, default=False)
    
    # TODO: log errors
    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            capture_exception(e)
            db.session.rollback()
            raise e

    def update(self):
        try:
            db.session.commit()
        except Exception as e:
            capture_exception(e)
            db.session.rollback()
            raise e

    def delete(self):
        try:
            self.is_deleted = True
            self.deleted_at = db.func.now()
            db.session.commit()
        except Exception as e:
            capture_exception(e)
            db.session.rollback()
            raise e
