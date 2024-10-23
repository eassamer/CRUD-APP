#!/bin/sh

# Wait for the PostgreSQL server to start
while ! nc -z postgres 5432; do
  sleep 1
done

npx prisma generate
# Run Prisma migrations
npx prisma migrate dev

# Start the application
npm run start