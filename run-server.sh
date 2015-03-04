#!/bin/sh -e

if   [ "$1" = "--help" ] ; then
  echo "Usage: run-server [--gunicorn]"
elif [ "$1" = "--gunicorn" ] ; then
  echo "Starting gunicorn app server"
  gunicorn --workers=2 --bind=:5000 lemongrab:app
else
  echo "Starting development server"
  # better for active development
  python lemongrab.py
fi
