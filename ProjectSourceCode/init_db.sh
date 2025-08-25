#!/bin/bash

# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private

# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI=${DATABASE_URL}
echo "Running create.sql..."
psql "$PG_URI" -f src/init_data/create.sql
# Execute each .sql file in the directory
for file in src/init_data/*.sql; do
    echo "Executing $file..."
    psql "$PG_URI" -f "$file"
done