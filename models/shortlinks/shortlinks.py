from models.shortlinks.init import db

class ShortLink(db.Document):
    slug = db.StringField(unique=True, required=True)
    ios = db.DictField(required=True)
    android = db.DictField(required=True)
    web = db.StringField(required=True)
     
    def format(self):
        return {
            'slug': self.slug,
            'ios': {
                'primary': self.ios.get('primary', ''),
                'fallback': self.ios.get('fallback', '')
            },
            'android': {
                'primary': self.android.get('primary', ''),
                'fallback': self.android.get('fallback', '')
            },
            'web': self.web
        }
