import os
from http.server import BaseHTTPRequestHandler, HTTPServer

import psycopg2

DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres:example@db:5432/mydb")


def init_db():
    """Создание таблицы при первом запуске"""
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            text TEXT NOT NULL
        );
    """)
    conn.commit()
    cur.close()
    conn.close()


class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        cur.execute("SELECT text FROM messages;")
        rows = cur.fetchall()

        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()

        if rows:
            msg_list = "\n".join([r[0] for r in rows])
            self.wfile.write(f"Stored messages:\n{msg_list}".encode())
        else:
            self.wfile.write(b"No messages found.")

        cur.close()
        conn.close()

    def do_POST(self):
        """Добавление нового сообщения"""
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode()

        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        cur.execute("INSERT INTO messages (text) VALUES (%s);", (body,))
        conn.commit()
        cur.close()
        conn.close()

        self.send_response(201)
        self.end_headers()
        self.wfile.write(b"Message stored.")


if __name__ == "__main__":
    init_db()
    server = HTTPServer(("0.0.0.0", 3000), SimpleHandler)
    print("Server running on http://0.0.0.0:3000")
    server.serve_forever()
