#!/bin/bash
echo "Starting full OmniFFold pipeline..."
python3 tracking_runner.py
python3 splatter_generator.py
npm run dev  # Or start your Three.js/React viewer
