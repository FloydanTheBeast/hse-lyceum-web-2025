INSERT INTO
  artists (name)
VALUES
  ('Принц и Комик'),
  ('Oasis');

UPDATE artists
SET
  name = 'Король и Шут'
WHERE
  name = 'Принц и Комик';

DELETE FROM artists
WHERE
  name LIKE '%black%'