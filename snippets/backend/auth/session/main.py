import uuid
from http.server import BaseHTTPRequestHandler, HTTPServer

# Храним сессии
sessions = {}


class SimpleSessionServer(BaseHTTPRequestHandler):
    def do_GET(self):
        # Проверяем cookie
        session_id = self.get_session_id()

        if self.path == "/":
            if session_id in sessions:
                self.respond_page(f"""
                    <h1>Привет, {sessions[session_id]}!</h1>
                    <a href="/logout">Выйти</a>
                """)
            else:
                self.respond_page("""
                    <h1>Вы не авторизованы</h1>
                    <a href="/login">Войти</a>
                """)
        elif self.path == "/login":
            # Создаем новую сессию
            session_id = str(uuid.uuid4())
            sessions[session_id] = "User"

            self.send_response(302)

            # Установка куки
            self.send_header(
                "Set-Cookie",
                f"session_id={session_id}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict;",
            )
            self.send_header(
                "Set-Cookie",
                f"some_cookie=some_value; Path=/; SameSite=Lax;",
            )

            self.send_header("Location", "/")
            self.end_headers()
        elif self.path == "/logout":
            if session_id in sessions:
                del sessions[session_id]

            self.send_response(302)

            # Удаление куки
            self.send_header(
                f"Set-Cookie", "session_id={session_id}; Max-Age=0; Path=/"
            )

            self.send_header("Location", "/")
            self.end_headers()
        else:
            self.respond_page("<h1>404 Not Found</h1>", 404)

    def get_session_id(self):
        cookie = self.headers.get("Cookie")
        if not cookie:
            return None

        for part in cookie.split(";"):
            part = part.strip()
            if part.startswith("session_id="):
                return part.split("=", 1)[1]
        return None

    def respond_page(self, html, code=200):
        self.send_response(code)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(
            f"""
            <html>
            <body>{html}</body>
            </html>
        """.encode("utf-8")
        )


if __name__ == "__main__":
    print("Server running on http://localhost:8080")
    HTTPServer(("localhost", 8080), SimpleSessionServer).serve_forever()
