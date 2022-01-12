#!/usr/bin/python3
'''handles api routes for Place class'''
from api.v1.views import app_views, modelsDict
from models import storage
from datetime import datetime
import flask


@app_views.route('/cities/<cid>/places', methods=['GET'], strict_slashes=False)
@app_views.route('/places/<pid>', methods=['GET'], strict_slashes=False)
def pl_get(cid=None, pid=None):
    ''' returns city info
    '''
    if cid:
        try:
            # may need to add response code
            return flask.jsonify(
                [ob.to_dict() for ob in
                 storage.all()['City.' + cid].places]
            )
        except Exception:
            flask.abort(404)
    if pid:
        place = storage.get(modelsDict["places"], pid)
        if place:
            return flask.make_response(place.to_dict(), 200)
        else:
            flask.abort(404)


@app_views.route('/places/<id>', methods=['DELETE'], strict_slashes=False)
def pl_del(id=None):
    '''delete Place by id, return blank json on success else 404 page'''
    if storage.get("Place", id):
        storage.get('Place', id).delete()
        storage.save()
        return flask.make_response({}, 200)
    else:
        flask.abort(404)


@app_views.route('/cities/<id>/places', methods=['POST'], strict_slashes=False)
def pl_post(id=None):
    '''create place with input JSON'''
    new_pl = flask.request.get_json()
    if not new_pl:
        flask.abort(400, 'Not a JSON')
    if 'user_id' not in new_pl.keys():
        flask.abort(400, 'Missing user_id')
    if 'name' not in new_pl.keys():
        flask.abort(400, 'Missing name')
    if not storage.get(modelsDict["cities"], id):
        flask.abort(404)
    if not storage.get(modelsDict['users'], new_pl['user_id']):
        flask.abort(404)
    new_pl['city_id'] = id
    pl = modelsDict['places'](**new_pl)
    storage.new(pl)
    storage.save()
    return flask.make_response(pl.to_dict(), 201)


@app_views.route('/places/<id>', methods=['PUT'], strict_slashes=False)
def pl_put(id=None):
    '''update Place by id, return updated Place else 404 page'''
    try:
        storage.all()['Place.' + id].to_dict()
    except Exception:
        flask.abort(404)
    up_pl = flask.request.get_json()
    if not up_pl:
        flask.abort(400, 'Not a JSON')
    for key in up_pl:
        if key not in ['id', 'user_id', 'city_id',
                       'created_at', 'updated_at']:
            setattr(
                storage.all()['Place.' + id],
                key,
                up_pl[key]
            )
    # may cause checker issue because updated_at wasn't ignored
    setattr(
        storage.all()['Place.' + id],
        'updated_at',
        datetime.now()
    )
    storage.save()
    return flask.make_response(storage.all()['Place.' + id].to_dict(), 200)
