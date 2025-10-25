import os
from http.server import BaseHTTPRequestHandler, HTTPServer


class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write("Привет, Docker!".encode("utf-8"))

        with open("out.logs", "a") as out:
            out.write(f"Получен запрос от {self.client_address}\n")


host = os.environ["SERVER_HOST"]

if not host:
    print("Переменная окружения SERVER_HOST не установлена")
    exit(-1)

port = int(os.environ["SERVER_PORT"])

if not port:
    print("Переменная окружения SERVER_PORT не установлена")
    exit(-1)

server = HTTPServer((host, port), SimpleHandler)

print(f"Сервер запущен на http://{host}:{port}")
server.serve_forever()
