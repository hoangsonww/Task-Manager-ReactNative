#!/bin/bash

# ========================================
# TaskNexus Wiki Server Script
# ========================================

echo "🚀 Starting TaskNexus Wiki Server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 detected"
    echo "📡 Starting HTTP server on http://localhost:8000"
    echo ""
    echo "👉 Press Ctrl+C to stop the server"
    echo "👉 Open http://localhost:8000 in your browser"
    echo ""
    
    # Start Python HTTP server
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "✅ Python detected"
    echo "📡 Starting HTTP server on http://localhost:8000"
    echo ""
    echo "👉 Press Ctrl+C to stop the server"
    echo "👉 Open http://localhost:8000 in your browser"
    echo ""
    
    # Start Python 2 HTTP server (fallback)
    python -m SimpleHTTPServer 8000
    
else
    echo "❌ Python is not installed!"
    echo ""
    echo "Please install Python 3 or use an alternative:"
    echo ""
    echo "Option 1 - Install Python:"
    echo "  brew install python3"
    echo ""
    echo "Option 2 - Use Node.js http-server:"
    echo "  npm install -g http-server"
    echo "  http-server -p 8000"
    echo ""
    echo "Option 3 - Open directly in browser:"
    echo "  open index.html"
    echo ""
    exit 1
fi
