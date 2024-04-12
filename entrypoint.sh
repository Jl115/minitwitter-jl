#!/bin/bash

# wait-for-it logic here
while ! nc -z db 5432; do   
  echo "Waiting for the PostgreSQL server to be ready..."
  sleep 2
done

# Start the main container process.
exec npm run start
