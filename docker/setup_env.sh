#!/bin/bash

# Configuration
# Find the script's directory and then the docker directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DOCKER_DIR="$SCRIPT_DIR"

ENV_FILE="$DOCKER_DIR/.env"
EXAMPLE_FILE="$DOCKER_DIR/.env.example"

if [ -f "$ENV_FILE" ]; then
    echo ".env already exists. Skipping."
else
    echo "Creating .env from .env.example..."
    cp "$EXAMPLE_FILE" "$ENV_FILE"
    
    # Generate random secret keys (fallback if openssl is missing)
    if command -v openssl >/dev/null 2>&1; then
        SECRET_KEY=$(openssl rand -hex 32)
    else
        SECRET_KEY=$(date +%s | sha256sum | base64 | head -c 32)
    fi
    
    # Use different delimiter for sed to avoid escaping issues with keys
    sed -i "s|SECRET_KEY=.*|SECRET_KEY=$SECRET_KEY|g" "$ENV_FILE"
    
    # Update branding-related defaults
    sed -i "s|CONSOLE_API_URL=.*|CONSOLE_API_URL=http://localhost:5001|g" "$ENV_FILE"
    sed -i "s|CONSOLE_WEB_URL=.*|CONSOLE_WEB_URL=http://localhost:3000|g" "$ENV_FILE"
    
    echo ".env created successfully."
fi
