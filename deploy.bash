#!/bin/bash
# deploy.bash

if hash eb 2>/dev/null ; then
  echo "Elasic Beanstalk CLI installed."
else
  echo "Need to install Elastic Beanstalk CLI to deploy."
  echo "--> $ sudo pip install awsebcli"
  # you will also need to set aws keys and initialize eb once installed
  #
  # $ eb init     # init
  # (application name is lemongrab, region is us-west-2)
  exit 1
fi

set -e
# view existing envs
eb list

# try to use lemongrab-dev
eb use lemongrab-dev

# try to checkout master
git checkout master

# deploy the latest
eb deploy

# open the app
eb open
