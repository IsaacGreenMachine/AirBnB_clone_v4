#!/usr/bin/python3
'''handles api routes for State class'''
from api.v1.views import app_views, modelsDict
from models import storage
from datetime import datetime
import flask


@app_views.route('/states/<sid>/cities', methods=['GET'], strict_slashes=False)
@app_views.route('/cities/<cid>', methods=['GET'], strict_slashes=False)
def city_get(sid=None, cid=None):
    ''' returns city info
    '''
    if sid:
        try:
            # may need to add response code
            return flask.jsonify(
                [ob.to_dict() for ob in
                 storage.all()['State.' + sid].cities]
            )
        except Exception:
            flask.abort(404)
    if cid:
        city = storage.get(modelsDict["cities"], cid)
        if city:
            return flask.make_response(city.to_dict(), 200)
        else:
            flask.abort(404)


@app_views.route('/cities/<id>', methods=['DELETE'], strict_slashes=False)
def ct_del(id=None):
    '''delete City by id, return blank json on success else 404 page'''
    if storage.get("City", id):
        storage.get('City', id).delete()
        storage.save()
        return flask.make_response({}, 200)
    else:
        flask.abort(404)


@app_views.route('/states/<id>/cities', methods=['POST'], strict_slashes=False)
def ct_post(id=None):
    '''create City with input JSON'''
    new_ct = flask.request.get_json()
    if not new_ct:
        flask.abort(400, 'Not a JSON')
    if 'name' not in new_ct.keys():
        flask.abort(400, 'Missing name')
    if storage.get(modelsDict["states"], id):
        new_ct.update({"state_id": id})
        ct = modelsDict['cities'](**new_ct)
        storage.new(ct)
        storage.save()
        return flask.make_response(ct.to_dict(), 201)
    else:
        flask.abort(404)


@app_views.route('/cities/<id>', methods=['PUT'], strict_slashes=False)
def ct_put(id=None):
    '''update City by id, return updated City else 404 page'''
    try:
        storage.all()['City.' + id].to_dict()
    except Exception:
        flask.abort(404)
    up_ct = flask.request.get_json()
    if not up_ct:
        flask.abort(400, 'Not a JSON')
    for key in up_ct:
        if key not in ['id', 'update_at', 'created_at', 'state_id']:
            setattr(
                storage.all()['City.' + id],
                key,
                up_ct[key]
            )
    # may cause checker issue because updated_at wasn't ignored
    setattr(
        storage.all()['City.' + id],
        'updated_at',
        datetime.now()
    )
    storage.save()
    return flask.make_response(storage.all()['City.' + id].to_dict(), 200)
