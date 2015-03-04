#!/bin/sh -e

url=http://localhost:5000

echo "-- get app --"
curl -i $url
echo "\n"

echo "-- browser tries to get list --"
curl -i \
  $url/list/get-a-list
echo "\n"

echo "-- app tries to get list --"
curl -i \
  -H "Content-Type: application/json" \
  $url/list/get-a-list
echo "\n"

echo "-- app posts to list --"
curl -i \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"items":[]}' \
  $url/list/post-to-a-list
echo ""