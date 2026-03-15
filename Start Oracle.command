#!/bin/bash
# ── Oracle Launcher ────────────────────────────────────────────────────────────
# Double-click this file to start the Oracle server and open the browser.
# macOS may ask to allow running on first use — click "Allow".

# Go to the project directory (same folder as this script)
cd "$(dirname "$0")"

echo "========================================"
echo "  PERS-41 Oracle — Starting Server..."
echo "========================================"
echo ""

# Check Node is installed
if ! command -v node &> /dev/null; then
    echo "❌  Node.js is not installed. Please install it from https://nodejs.org"
    read -p "Press Enter to close..."
    exit 1
fi

echo "✅  Node.js found: $(node -v)"
echo "✅  Starting server at http://localhost:3000 ..."
echo ""
echo "NOTE: Keep this window open while using the Oracle."
echo "      Closing it will stop the server and saves will fail."
echo ""

# Open browser after a short delay (gives server time to start)
(sleep 4 && open http://localhost:3000/oracle) &

# Start the server (stays open — this is intentional)
npm run dev
