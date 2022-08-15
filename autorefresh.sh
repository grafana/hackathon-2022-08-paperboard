#!/bin/sh

set -e

period=360
if [ "${1}" != "" ] ; then
  period="${1}"
fi

while true ; do
  node ./screenshot.js
  ./image.py screenshot.png
  sleep "${period}"
done
