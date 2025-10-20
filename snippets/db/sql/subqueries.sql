SELECT Name, UnitPrice
FROM tracks
WHERE UnitPrice > (
  SELECT AVG(UnitPrice) FROM tracks
);

SELECT EmployeeId, FirstName, LastName 
FROM employees
WHERE EmployeeId NOT IN (
  SELECT DISTINCT SupportRepId 
  FROM customers
  WHERE SupportRepId IS NOT NULL
);

SELECT 
    sub.CustomerId,
    c.FirstName,
    c.LastName,
    ROUND(sub.AvgInvoiceTotal, 2) as avg_total
FROM (
    SELECT 
        CustomerId,
        AVG(Total) AS AvgInvoiceTotal
    FROM invoices
    GROUP BY CustomerId
) AS sub
JOIN customers c ON c.CustomerId = sub.CustomerId
ORDER BY sub.AvgInvoiceTotal DESC
LIMIT 5;