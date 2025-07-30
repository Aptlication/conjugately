#!/usr/bin/env python3
"""
Simple HTTP server for French Verb Master Mobile App
Serves the mobile-optimized PWA on port 80
"""

import http.server
import socketserver
import os

PORT = 80

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()

if __name__ == "__main__":
    # Change to the directory containing the web files
    web_dir = os.path.dirname(os.path.realpath(__file__))
    os.chdir(web_dir)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"French Verb Master Mobile serving at port {PORT}")
        httpd.serve_forever()