#!/bin/bash

if hash docker 2>/dev/null ; then
  echo "Docker installed."
else
  echo "Need to install docker to start dockerized app."
  exit 1
fi

if hash boot2docker 2>/dev/null ; then
  echo "Assuming Mac OS X docker configuration. Setting up boot2docker."
  boot2docker status 2>/dev/null 1>/dev/null
  if [ $? -eq 0 ] ; then
    echo "VM exists."
  else
    echo "VM not found, creating VM..."
    boot2docker init
  fi
  vmStatus=`boot2docker status`
  if [ "$vmStatus" != "running" ] ; then
    echo "VM is not running, starting VM."
    boot2docker up
  fi
  # must also set environment variables for docker VM
  eval "$(boot2docker shellinit 2>/dev/null)"
fi

# exit if we get a non-zero exit code
set -e

# configs
tag="mtkp/lemongrab"
port="5000"

existingContainer=`docker ps | grep "$tag" | awk '{ print $1 }'`
if [ -n "$existingContainer" ] ; then
  echo "Existing container found: $existingContainer. Stopping container before we run the new one."
  docker stop "$existingContainer"
fi

echo "Building latest image for $tag"
docker build -t "$tag" .

echo "Running latest $tag in container..."
docker run --publish "$port":"$port" "$tag" &

if hash boot2docker 2>/dev/null ; then
  # on Mac OS X, must get IP from boot2docker
  dockerVM_IP=`boot2docker ip`
  echo "$tag will be accessible at $dockerVM_IP:$port"
else
  echo "$tag will be accessible at localhost:$port"
fi
