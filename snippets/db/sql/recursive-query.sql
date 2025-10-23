WITH RECURSIVE hierarchy AS (
    SELECT EmployeeId, FirstName, ReportsTo, 1 AS level
    FROM employees
    WHERE ReportsTo IS NULL

    UNION ALL

    SELECT e.EmployeeId, e.FirstName, e.ReportsTo, h.level + 1
    FROM employees e
    JOIN hierarchy h ON e.ReportsTo = h.EmployeeId
)
SELECT * FROM hierarchy;