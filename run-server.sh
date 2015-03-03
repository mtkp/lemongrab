#!/bin/sh -e

gunicorn --workers=2 --bind=:8080 lemongrab:app
