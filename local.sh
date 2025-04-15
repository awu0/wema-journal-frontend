#!/bin/sh
# Run your React frontend against a local API server.
echo "Waiting for Flask backend to start..."

until curl --silent --fail http://127.0.0.1:8000; do
  printf '.'
  sleep 1
done

echo "\n✅ Backend is up!"


export REACT_APP_URL_PRE="http://127.0.0.1:8000"
npm start
