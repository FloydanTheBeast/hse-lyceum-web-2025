import base64
import hmac
import hashlib
import json

SECRET_KEY = b'someverysecretkey1337'

def base64url_encode(input: bytes):
    return base64.urlsafe_b64encode(input).decode().replace('=','') 

header = json.dumps({
  "alg": "HS256",
  "typ": "JWT"
}).encode()

payload = json.dumps({
  "sub": "1234567890",
  "name": "Ivan Ivanov",
  "admin": True,
  "iss": "some_app",
  "iat": 1516239022
}).encode()

header_encoded = base64url_encode(header)
payload_encoded = base64url_encode(payload)

sig_input = f'{header_encoded}.{payload_encoded}'.encode()

sig = base64url_encode(hmac.new(SECRET_KEY, sig_input, hashlib.sha256).digest())

print(f'{header_encoded}.{payload_encoded}.{sig}')