SELECT
  *
FROM
  tracks t
WHERE
  t.Milliseconds > POW(10, 5) * 5
LIMIT
  10;

SELECT
  name,
  AlbumId,
  UnitPrice
FROM
  tracks
WHERE
  Composer IN ('AC/DC', 'Queen')
LIMIT
  50
OFFSET
  5;

SELECT
  name AS artist_name
FROM
  artists
WHERE
  name LIKE '%black%';

SELECT
  *
FROM
  tracks
ORDER BY
  Milliseconds DESC
LIMIT
  10;

SELECT
  name,
  ROUND(t.Milliseconds / 1000 / 60) as duration
FROM
  tracks t
WHERE
  duration BETWEEN 10 AND 20
ORDER BY
  duration DESC,
  t.name ASC
LIMIT
  50;