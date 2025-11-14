- Скачайте и разархивируйте БД отсюда - [Neon.tech - Sample PostgreSQL Database](https://neon.com/postgresql/postgresql-getting-started/postgresql-sample-database)
- Выполните
  ```sh
  createdb sample_db
  pg_restore -U postgres -d dvdrental dvdrental.tar
  ```