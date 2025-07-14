#!/bin/sh
set -e

echo "🌱 Seeding MongoDB with sample reviews…"
node seed.js

echo "🚀 Launching Node server…"
exec node server.js
