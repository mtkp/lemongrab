# lemongrab.py
from collections import defaultdict

from flask import Flask, json, render_template, request
from jsonschema import validate, ValidationError

# define list schema
schema = {
    'type': 'object',
    'properties': {
        'items': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'description': {'type': 'string'},
                    'completed': {'type': 'boolean'},
                },
            },
        },
    },
    'required': ['items'],
}

# initialize dummy in-memory data store
data_store = defaultdict(list)

# start the server
app = Flask(__name__)
app.debug = True

@app.route('/')
def load_app():
    """
    Return the app to the client.
    """
    return render_template('index.html')

@app.route('/list/<listname>')
def load_app_with_list(listname):
    """
    Return the app, let the app read the resource
    from the URI and make a separate API request.
    """
    return load_app()

def get(listname):
    """
    Get a list by listname.
    """
    lst = {'items': data_store[listname]}
    return json.jsonify(lst)

def put(listname):
    """
    Save a list by listname.
    """
    lst = request.get_json()
    try:
        validate(lst, schema)
        data_store[listname] = lst['items']
        return 'Saved "{}"'.format(listname)
    except ValidationError:
        return "Invalid JSON schema", 403

@app.route('/api/v1/list/<listname>', methods=['GET', 'PUT'])
def list_request(listname):
    """
    List resource method dispatcher.
    """
    return {'GET': get,
            'PUT': put}.get(request.method)(listname)

if __name__ == '__main__':
    app.run()
