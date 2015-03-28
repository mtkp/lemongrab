#!/bin/bash
# deploy.bash

if hash eb 2>/dev/null ; then
  echo "Elasic Beanstalk CLI installed."
else
  echo "Need to install Elastic Beanstalk CLI to deploy."
  echo "\"$ sudo pip install awsebcli\""
  exit 1
fi

# eb init     # init
# eb create   # create an environment

set -e

# view existing envs
eb list

# try to use lemongrab-dev
eb use lemongrab-dev

# deploy the latest
eb deploy

# open the app
eb open
