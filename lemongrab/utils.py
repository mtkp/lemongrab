# utils.py
import functools

from flask import json, request
from jsonschema import validate, ValidationError

def jsonify_response(f):
    @functools.wraps(f)
    def wrapped_f(*args, **kwargs):
        return json.jsonify(f(*args, **kwargs))
    return wrapped_f

bad_schema_error = ('Invalid schema', 403)

def is_valid(o, schema):
    try:
        validate(o, schema)
    except ValidationError:
        return False
    return True

def validate_response(schema):
    def wrapped_schema(f):
        @functools.wraps(f)
        def wrapped_f(*args, **kwargs):
            o = f(*args, **kwargs)
            if is_valid(o, schema):
                return o
            return invalid_schema
        return wrapped_f
    return wrapped_schema

def validate_request(schema):
    def wrapped_schema(f):
        @functools.wraps(f)
        def wrapped_f(*args, **kwargs):
            if is_valid(request.get_json(cache=True), schema):
                return f(*args, **kwargs)
            return invalid_schema
        return wrapped_f
    return wrapped_schema
