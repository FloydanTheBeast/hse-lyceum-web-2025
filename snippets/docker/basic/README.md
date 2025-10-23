- Сборка образа
  ```sh
  docker build -t python-basic .
  ```
- Запуск без тома
  ```sh
  docker run -dp 3000:3000 python-basic
  ```
- Создание тома и запуск с ним
  ```sh
  docker volume create python-basic-db
  docker run -dp 3000:3000 -v python-basic-db:/app/ python-basic
  ```
- Запуск с монтированием текущей директории
  ```sh
  docker run -dp 3000:3000 -v "$(pwd):/app" python-basic
  ```