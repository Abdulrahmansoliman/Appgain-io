from flask import Flask
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import mongoengine
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://abdulrahmansoliman391:1234@cluster0.afo6bau.mongodb.net/?retryWrites=true&w=majority',
    'db': 'shortlinks'}

db = MongoClient(app.config['MONGODB_SETTINGS']
                 ['host'], server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    db.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Set the default connection for mongoengine
mongoengine.connect(app.config['MONGODB_SETTINGS']
                    ['db'], host=app.config['MONGODB_SETTINGS']['host'])

with app.app_context():

    from routes.shorlinks.shortlinks import shortlinks_bp
    app.register_blueprint(shortlinks_bp, url_prefix='/shortlinks')



if __name__ == '__main__':
    # DEBUG is SET to TRUE. CHANGE FOR PROD

    app.run(port=5000, debug=True)


