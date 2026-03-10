#!/bin/bash
APP_DIR="/Users/benjaminkozlowski/Documents/Oracle"
LOG="/tmp/oracle-dev.log"
URL="http://localhost:3000"

# If server already running, just open browser
if lsof -i TCP:3000 -sTCP:LISTEN -t > /dev/null 2>&1; then
    open "$URL"
    exit 0
fi

# Start the dev server in background
cd "$APP_DIR"
nohup npm run dev > "$LOG" 2>&1 &

# Wait up to 30s for it to be ready
for i in $(seq 1 30); do
    if curl -s -o /dev/null -w "%{http_code}" "$URL" | grep -q "200\|304"; then
        break
    fi
    sleep 1
done

open "$URL"
