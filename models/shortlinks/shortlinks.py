from models.init import *


class ShortLink(db.Document):
    slug = db.StringField(unique=True, required=True)
    ios = db.DictField(required=True)
    android = db.DictField(required=True)
    web = db.StringField(required=True)
