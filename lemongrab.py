# lemongrab.py
import functools

from flask import Flask, json, render_template, request

app = Flask(__name__)
app.debug = True

@app.route('/')
def load_app():
    """
    Sends JS app to client.
    """
    return render_template('index.html')

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

def api_route(f):
    """Requires the requested content type to be JSON,
    otherwise returns HTML response.
    """
    @functools.wraps(f)
    def wrapped_handler(*args, **kwargs):
        if request.headers['Content-Type'] == 'application/json':
            return f(*args, **kwargs)
        else:
            return load_app()
    return wrapped_handler

@app.route('/list/<listname>')
@api_route
def get_list(listname):
    print request.headers['Content-Type']
    return json.jsonify(mock_list(listname))

@app.route('/list/<listname>', methods=['POST'])
@api_route
def save_list(listname):
    print 'Saving "%s"' % request.get_json()
    return 'Saved "%s"' % listname

if __name__ == '__main__':
    app.run()