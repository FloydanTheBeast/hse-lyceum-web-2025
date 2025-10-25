FROM python:3.12-alpine

WORKDIR /app

COPY . .

# Слушаем на всех интерфейсах, а не только на localhost
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=3000

CMD ["python", "server.py"]