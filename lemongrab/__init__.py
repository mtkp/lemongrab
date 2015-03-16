# __init__.py
from collections import defaultdict

from flask import Flask

# initialize dummy in-memory data store
data_store = defaultdict(list)

# create the Flask app
app = Flask(__name__)

# Flask requires additional views to be imported after
# the Flask app is created.
import lemongrab.views
