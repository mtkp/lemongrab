#!/bin/sh -e

url=http://localhost:5000

echo "-- get app --"
curl -i $url
echo ; echo

echo "-- browser tries to get list --"
curl -i \
  $url/list/get-a-list
echo ; echo

echo "-- app tries to get list --"
curl -i \
  -H "Accept: application/json" \
  $url/api/v1/list/get-a-list
echo ; echo

echo "-- app posts to list --"
curl -i \
  -X PUT \
  -H "Content-Type: application/json" \
  -d '{"items":["item 1"]}' \
  $url/api/v1/list/post-to-a-list
echo ; echo