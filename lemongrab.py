# lemongrab.py
from flask import Flask, json, render_template, request

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

def mock_list(name):
    itm = lambda d, c: {'description': d, 'completed': c}
    return {
        'name': name,
        'items': [
            itm('Walk the dog first', True),
            itm('Get haircut second', False),
            itm('Groceries third', False),
        ],
    }

def get(listname):
    return json.jsonify(mock_list(listname))

def put(listname):
    print 'Saving "%s"' % request.get_json()
    return 'Saved "%s"' % listname

@app.route('/api/v1/list/<listname>', methods=['GET', 'PUT'])
def list_request(listname):
    return {'GET': get,
            'PUT': put}.get(request.method)(listname)

if __name__ == '__main__':
    app.run()
