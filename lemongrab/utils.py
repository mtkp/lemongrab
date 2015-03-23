# utils.py
import functools

from flask import json, request
from jsonschema import validate, ValidationError

def jsonify_response(f):
    @functools.wraps(f)
    def wrapped_f(*args, **kwargs):
        return json.jsonify(f(*args, **kwargs))
    return wrapped_f

def validate_response(schema):
    def wrapped_schema(f):
        @functools.wraps(f)
        def wrapped_f(*args, **kwargs):
            o = f(*args, **kwargs)
            try:
                validate(o, schema)
            except ValidationError:
                return 'Invalid schema', 403
            return o
        return wrapped_f
    return wrapped_schema

def validate_request(schema):
    def wrapped_schema(f):
        @functools.wraps(f)
        def wrapped_f(*args, **kwargs):
            try:
                validate(request.get_json(cache=True), schema)
            except ValidationError:
                return 'Invalid schema', 403
            return f(*args, **kwargs)
        return wrapped_f
    return wrapped_schema

