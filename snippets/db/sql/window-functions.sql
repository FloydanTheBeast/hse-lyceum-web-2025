SELECT
  c.CustomerId,
  c.FirstName || ' ' || c.LastName AS CustomerName,
  SUM(i.Total) AS TotalSpent,
  RANK() OVER (ORDER BY SUM(i.Total) DESC) AS SpendingRank,
  DENSE_RANK() OVER (ORDER BY SUM(i.Total) DESC) AS DenseRank
FROM Customers c
JOIN Invoices i ON c.CustomerId = i.CustomerId
GROUP BY c.CustomerId
ORDER BY SpendingRank;

SELECT
    i.CustomerId,
    c.FirstName || ' ' || c.LastName AS CustomerName,
    i.InvoiceId,
    i.Total,
    ROUND(AVG(i.Total) OVER (PARTITION BY i.CustomerId), 2) AS AvgPerCustomer,
    ROUND(i.Total - AVG(i.Total) OVER (PARTITION BY i.CustomerId), 2) AS Deviation
FROM Invoices i
JOIN customers c ON c.CustomerId = i.CustomerId
ORDER BY i.CustomerId, i.InvoiceDate;

SELECT
    a.Title AS Album,
    t.Name AS Track,
    t.Milliseconds / 1000 AS DurationSec,
    RANK() OVER album_tracks AS RankInAlbum
FROM Tracks t
JOIN Albums a ON t.AlbumId = a.AlbumId
WINDOW album_tracks AS (PARTITION BY a.AlbumId ORDER BY t.Milliseconds DESC)
ORDER BY a.Title, RankInAlbum;

SELECT
  LAG(FirstName, 1)
    OVER(ORDER BY FirstName) AS prev,
  FirstName AS current,
  LEAD(FirstName, 1) 
    OVER(ORDER BY FirstName) AS next
FROM employees;
