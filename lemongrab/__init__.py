# __init__.py
from collections import defaultdict

from flask import Flask

# initialize dummy in-memory data store
data_store = defaultdict(list)

class LemongrabFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(
        block_start_string='<%',
        block_end_string='%>',
        variable_start_string='<=',
        variable_end_string='=>',
        comment_start_string='<#',
        comment_end_string='#>',
    )

# create the Flask app
app = LemongrabFlask(__name__)

# Flask requires additional views to be imported after
# the Flask app is created.
import lemongrab.views
