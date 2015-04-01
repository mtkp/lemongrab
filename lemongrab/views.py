# views.py
from flask import json, render_template, request

from lemongrab import app, data_store, models
from lemongrab.utils import jsonify_response, validate_request, \
                            validate_response

@app.route('/')
def load_app():
    """Return the app to the client."""
    return render_template('index.html')

@app.route('/list/<listname>')
def load_app_with_list(listname):
    """Return the app, let the app read the resource
    from the URI and make a separate API request.
    """
    return load_app()

@jsonify_response
@validate_response(models.schema)
def get(listname):
    """Get a list by listname."""
    if request.args.get('mock', '') == 'true':
        return models.mock_list
    else:
        return data_store[listname]

@validate_request(models.schema)
def put(listname):
    """Save a list by listname."""
    data_store[listname] = request.get_json()
    return 'Saved "{}"'.format(listname)

@app.route('/api/v1/list/<listname>', methods=['GET', 'PUT'])
def list_request(listname):
    """List resource method dispatcher."""
    return {'GET': get,
            'PUT': put}.get(request.method)(listname)
