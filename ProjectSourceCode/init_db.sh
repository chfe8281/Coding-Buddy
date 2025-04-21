#!/bin/bash

# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private

# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://users_db_eu7f_user:94dg2bpsKncEDpH3kr9mRFZyxHgnIP1x@dpg-d00m0f8dl3ps73e55sug-a.oregon-postgres.render.com/users_db_eu7f"

# Execute each .sql file in the directory
for file in src/init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done