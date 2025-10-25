DROP VIEW v_TopTracks IF EXISTS;

CREATE VIEW v_TopTracks AS
SELECT
    t.TrackId,
    t.Name AS TrackName,
    a.Title AS Album,
    ar.Name AS Artist,
    COUNT(ii.InvoiceLineId) AS SalesCount,
    ROUND(SUM(ii.UnitPrice * ii.Quantity), 2) AS Revenue
FROM invoice_items ii
JOIN tracks t ON ii.TrackId = t.TrackId
JOIN albums a ON t.AlbumId = a.AlbumId
JOIN artists ar ON a.ArtistId = ar.ArtistId
GROUP BY t.TrackId
ORDER BY Revenue DESC
LIMIT 10;

SELECT * FROM v_TopTracks;