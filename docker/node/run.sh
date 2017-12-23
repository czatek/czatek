#!/bin/sh


# Wait for postgres
sleep 10

echo "Apply database migrations"
npm run migrate

echo "Starting server"
npm start
