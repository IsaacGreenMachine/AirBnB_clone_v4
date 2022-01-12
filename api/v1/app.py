#!/usr/bin/python3
'''Setup our Flask app'''
from os import getenv
from flask import Flask
import flask
from models import storage
from api.v1.views import app_views
from flask_cors import CORS
"""app module for RESTful interface"""
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
app.register_blueprint(app_views)


@app.teardown_appcontext
def teardown_db(context):
    """closes the storage on teardown"""
    storage.close()


@app.errorhandler(404)
def page_not_found(err):
    '''defines return on 404 error'''
    return flask.make_response({"error": "Not found"}, 404)


if __name__ == "__main__":
    hostVal = getenv("HBNB_API_HOST")
    if hostVal is None:
        hostVal = '0.0.0.0'
    portVal = getenv("HBNB_API_PORT")
    if getenv("HBNB_API_PORT") is None:
        portVal = '5000'
    app.run(host=hostVal, port=portVal, threaded=True)
