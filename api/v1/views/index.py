#!/usr/bin/python3
'''looks like views index'''
from sqlalchemy.sql.functions import mode
from api.v1.views import app_views
from models import storage
import flask
from api.v1.views import modelsDict


@app_views.route('/status', strict_slashes=False)
def okayThen():
    '''return json obj for status'''
    return flask.jsonify({'status': 'OK'})


@app_views.route('/stats', strict_slashes=False)
def stats():
    '''print out stats using count'''
    return flask.jsonify(
        {'amenities': storage.count(modelsDict["amenities"]),
         'cities': storage.count(modelsDict["cities"]),
         'places': storage.count(modelsDict["places"]),
         'reviews': storage.count(modelsDict["reviews"]),
         'states': storage.count(modelsDict["states"]),
         'users': storage.count(modelsDict["users"])}
    )
