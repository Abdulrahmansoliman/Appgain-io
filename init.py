from flask import Flask
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from models.init import db

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://abdulrahmansoliman391:<1234>@cluster0.afo6bau.mongodb.net/?retryWrites=true&w=majority'
}

db = MongoClient(app.config['MONGODB_SETTINGS']
                 ['host'], server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    db.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

if __name__ == '__main__':
    # DEBUG is SET to TRUE. CHANGE FOR PROD
    app.run(port=5000, debug=True)
