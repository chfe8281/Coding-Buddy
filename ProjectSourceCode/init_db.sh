#!/bin/bash

# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private

# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://coding_buddy_db_user:RrcXMHbbkW0juSthSDAw6exIiCvmZLcM@dpg-d2man6q4d50c73alaslg-a.oregon-postgres.render.com/coding_buddy_db"
echo "Running create.sql..."
psql "$PG_URI" -f src/init_data/create.sql
# Execute each .sql file in the directory
for file in src/init_data/*.sql; do
    echo "Executing $file..."
    psql "$PG_URI" -f "$file"
done