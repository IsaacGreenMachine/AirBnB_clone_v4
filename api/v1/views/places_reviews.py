#!/usr/bin/python3
'''handles api routes for Place class'''
from api.v1.views import app_views, modelsDict
from models import storage
from datetime import datetime
import flask


@app_views.route(
    '/places/<pid>/reviews',
    methods=['GET'],
    strict_slashes=False
)
@app_views.route('/reviews/<rid>', methods=['GET'], strict_slashes=False)
def rv_get(pid=None, rid=None):
    ''' returns review info
    '''
    if pid:
        try:
            return flask.jsonify(
                [ob.to_dict() for ob in
                 storage.all()['Place.' + pid].reviews]
            )
        except Exception:
            flask.abort(404)
    try:
        return flask.make_response(
            storage.all()['Review.' + rid].to_dict(),
            200
        )
    except Exception:
        flask.abort(404)


@app_views.route('/reviews/<id>', methods=['DELETE'], strict_slashes=False)
def rv_del(id=None):
    '''delete Place by id, return blank json on success else 404 page'''
    if storage.get('Review', id):
        storage.get('Review', id).delete()
        storage.save()
        return flask.make_response({}, 200)
    else:
        flask.abort(404)


@app_views.route(
    '/places/<id>/reviews',
    methods=['POST'],
    strict_slashes=False
)
def rv_post(id=None):
    '''create place with input JSON'''
    new_rv = flask.request.get_json()
    if not new_rv:
        flask.abort(400, 'Not a JSON')
    if 'user_id' not in new_rv:
        flask.abort(400, 'Missing user_id')
    if 'text' not in new_rv:
        flask.abort(400, 'Missing text')
    if (storage.get('Place', id) and
            storage.get('User', new_rv['user_id'])):
        new_rv['place_id'] = id
        rv = modelsDict['reviews'](**new_rv)
        storage.new(rv)
        storage.save()
        return flask.make_response(rv.to_dict(), 201)
    else:
        flask.abort(404)


@app_views.route('/reviews/<id>', methods=['PUT'], strict_slashes=False)
def rv_put(id=None):
    '''update Place by id, return updated Place else 404 page'''
    try:
        storage.all()['Review.' + id].to_dict()
    except Exception:
        flask.abort(404)
    up_rv = flask.request.get_json()
    if not up_rv:
        flask.abort(400, 'Not a JSON')
    for key in up_rv:
        if key not in ['id', 'user_id', 'place_id',
                       'created_at', 'updated_at']:
            setattr(
                storage.all()['Review.' + id],
                key,
                up_rv[key]
            )
    # may cause checker issue because updated_at wasn't ignored
    setattr(
        storage.all()['Review.' + id],
        'updated_at',
        datetime.now()
    )
    storage.save()
    return flask.make_response(storage.all()['Review.' + id].to_dict(), 200)
