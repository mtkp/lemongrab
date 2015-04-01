#!/bin/bash -e

url=http://localhost:5000

echo "-- get app --"
curl -i "$url"
echo ; echo

echo "-- get app with list route --"
curl -i \
  "$url/list/get-a-list"
echo ; echo

echo "-- api: get mock list --"
curl -i \
  -H "Accept: application/json" \
  "$url/api/v1/list/api-examples-list?mock=true"
echo ; echo

echo "-- api: put empty list --"
curl -i \
  -X PUT \
  -H "Content-Type: application/json" \
  -d '{"description":"my empty list","items":[]}' \
  "$url/api/v1/list/api-examples-list"
echo ; echo

echo "-- api: put list --"
curl -i \
  -X PUT \
  -H "Content-Type: application/json" \
  -d '{"description":"a list",
       "items":[{"description":"item1","completed":false}]}' \
  "$url/api/v1/list/api-examples-list"
echo ; echo

echo "-- api: get list --"
curl -i \
  -H "Accept: application/json" \
  "$url/api/v1/list/api-examples-list"
echo ; echo

echo "-- api: put bad list --"
curl -i \
  -X PUT \
  -H "Content-Type: application/json" \
  -d '{"description":"bad list",
       "items":[{"description":"item1","completed":"not a boolean"}]}' \
  "$url/api/v1/list/api-examples-list"
echo ; echo
