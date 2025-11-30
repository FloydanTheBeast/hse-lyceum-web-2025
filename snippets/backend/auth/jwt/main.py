from http.server import BaseHTTPRequestHandler, HTTPServer
import json, time, hmac, hashlib, base64

SECRET = b"someverysecretkey1337"


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def sign(data: bytes) -> str:
    return b64url(hmac.new(SECRET, data, hashlib.sha256).digest())


def create_jwt(payload: dict, exp_seconds: int) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    payload = payload.copy()
    payload["exp"] = int(time.time()) + exp_seconds

    h_b64 = b64url(json.dumps(header).encode())
    p_b64 = b64url(json.dumps(payload).encode())
    sig = sign(f"{h_b64}.{p_b64}".encode())

    return f"{h_b64}.{p_b64}.{sig}"


def decode_part(data: str) -> dict:
    padding = "=" * (-len(data) % 4)
    return json.loads(base64.urlsafe_b64decode(data + padding))


def verify_jwt(token: str):
    """Возвращает payload или None"""
    try:
        h_b64, p_b64, sig = token.split(".")
        expected_sig = sign(f"{h_b64}.{p_b64}".encode())
        if sig != expected_sig:
            return None

        payload = decode_part(p_b64)
        if payload.get("exp", 0) < time.time():
            return None

        return payload
    except Exception:
        return None

class SimpleJWTServer(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.path == "/login":
            self.handle_login()
        elif self.path == "/refresh":
            self.handle_refresh()
        else:
            self.respond({"error": "Not found"}, 404)

    def do_GET(self):
        if self.path == "/protected":
            self.handle_protected()
        else:
            self.respond({"error": "Not found"}, 404)

    def handle_login(self):
        """Выдаём пару токенов"""
        user_id = "user123"

        access = create_jwt(
            {"user_id": user_id, "rt": False},
            exp_seconds=30
        )

        refresh = create_jwt(
            {"user_id": user_id, "rt": True},
            exp_seconds=3600  # 1 час
        )

        self.respond({"access_token": access, "refresh_token": refresh})

    def handle_refresh(self):
        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length))
        refresh_token = body.get("refresh_token")

        payload = verify_jwt(refresh_token)
        if not payload or not payload.get("rt"):
            self.respond({"error": "Invalid refresh token"}, 401)
            return

        user_id = payload["user_id"]

        # Выдаём новую пару
        access = create_jwt(
            {"user_id": user_id, "rt": False},
            exp_seconds=30
        )
        refresh = create_jwt(
            {"user_id": user_id, "rt": True},
            exp_seconds=3600
        )

        self.respond({"access_token": access, "refresh_token": refresh})

    def handle_protected(self):
        auth = self.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            self.respond({"error": "No token"}, 401)
            return

        token = auth.split(" ")[1]
        payload = verify_jwt(token)
        if not payload or payload.get("rt"):
            self.respond({"error": "Invalid token"}, 401)
            return

        self.respond({"message": "Access granted", "user": payload["user_id"]})

    def respond(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())


if __name__ == "__main__":
    print("Server running at http://localhost:8000")
    HTTPServer(("localhost", 8000), SimpleJWTServer).serve_forever()