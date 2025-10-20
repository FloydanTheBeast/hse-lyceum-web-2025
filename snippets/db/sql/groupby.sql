SELECT
  a.Name,
  COUNT(*) as tracks_count,
  ROUND(AVG(t.Milliseconds / 1000 / 60), 2) as average_duration
FROM
  artists a
  JOIN albums al ON al.ArtistId = a.ArtistId
  JOIN tracks t ON t.AlbumId = al.AlbumId;

SELECT
  a.Name,
  al.Title,
  COUNT(*) as tracks_count,
  ROUND(AVG(t.Milliseconds / 1000 / 60), 2) as average_duration
FROM
  artists a
  JOIN albums al ON al.ArtistId = a.ArtistId
  JOIN tracks t ON t.AlbumId = al.AlbumId
GROUP BY
  a.Name,
  al.Title
HAVING
  average_duration < 10
  AND tracks_count > 5
ORDER BY
  average_duration DESC,
  tracks_count DESC;