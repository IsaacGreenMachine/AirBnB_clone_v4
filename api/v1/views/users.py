#!/usr/bin/python3
'''handles api routes for User class'''
from api.v1.views import app_views, modelsDict
from models import storage
from datetime import datetime
import flask


@app_views.route('/users', methods=['GET'], strict_slashes=False)
@app_views.route('/users/<id>', methods=['GET'], strict_slashes=False)
def us_get(id=None):
    '''return all users unless id present, then check id and return
    single if present else 404 page
    '''
    if id is None:
        return flask.jsonify([ob.to_dict() for ob in storage.all(
            modelsDict['users']).values()]
        )

    try:
        return flask.jsonify(storage.all()['User.' + id].to_dict())
    except Exception:
        flask.abort(404)


@app_views.route('/users/<id>', methods=['DELETE'], strict_slashes=False)
def us_del(id=None):
    '''delete User by id, return blank json on success else 404 page'''
    if storage.get("User", id):
        storage.get('User', id).delete()
        storage.save()
        return flask.make_response({}, 200)
    else:
        flask.abort(404)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def us_post():
    '''create User with input JSON'''
    new_us = flask.request.get_json()
    if not new_us:
        flask.abort(400, 'Not a JSON')
    if 'email' not in new_us.keys():
        flask.abort(400, 'Missing email')
    if 'password' not in new_us.keys():
        flask.abort(400, 'Missing password')
    us = modelsDict['users'](**new_us)
    storage.new(us)
    storage.save()
    return flask.make_response(us.to_dict(), 201)


@app_views.route('/users/<id>', methods=['PUT'], strict_slashes=False)
def us_put(id=None):
    '''update User by id, return updated User else 404 page'''
    try:
        storage.all()['User.' + id].to_dict()
    except Exception:
        flask.abort(404)
    up_us = flask.request.get_json()
    if not up_us:
        flask.abort(400, 'Not a JSON')
    for key in up_us:
        if key not in ['id', 'update_at', 'created_at', 'email']:
            setattr(
                storage.all()['User.' + id],
                key,
                up_us[key]
            )
    # may cause checker issue because updated_at wasn't ignored
    setattr(
        storage.all()['User.' + id],
        'updated_at',
        datetime.now()
    )
    storage.save()
    return flask.make_response(storage.all()['User.' + id].to_dict(), 200)
