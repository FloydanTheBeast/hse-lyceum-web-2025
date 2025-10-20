-- INNER JOIN
SELECT emp1.FirstName, emp2.FirstName
FROM employees emp1
INNER JOIN employees emp2 
ON emp1.EmployeeId = emp2.ReportsTo;

-- LEFT JOIN
SELECT emp1.FirstName, emp2.FirstName
FROM employees emp1
LEFT JOIN employees emp2 
ON emp1.EmployeeId = emp2.ReportsTo;

-- ANTI LEFT JOIN
-- Сотрудники без подчинённых
SELECT emp1.FirstName, emp2.FirstName
FROM employees emp1
LEFT JOIN employees emp2
ON emp1.EmployeeId = emp2.ReportsTo
WHERE emp2.EmployeeId IS NULL;

-- RIGHT JOIN
-- Находим руководителей и их подчинённых
SELECT emp1.FirstName, emp2.FirstName
FROM employees emp1
RIGHT JOIN employees emp2 
ON emp1.EmployeeId = emp2.ReportsTo;

-- ANTI RIGHT JOIN
-- Находим сотрудиков без руководителей
SELECT emp1.FirstName, emp1.LastName, emp2.FirstName, emp2.LastName
FROM employees emp1
RIGHT JOIN employees emp2 
ON emp1.EmployeeId = emp2.ReportsTo
WHERE emp2.ReportsTo IS NULL;

-- FULL OUTER JOIN
-- Ищем всех сотрудников и их подчинённых
SELECT emp1.FirstName, emp2.FirstName
FROM employees emp1
FULL OUTER JOIN employees emp2
ON emp1.EmployeeId = emp2.ReportsTo;

-- ANTI OUTER JOIN
SELECT emp1.FirstName, emp2.FirstName
FROM employees emp1
FULL OUTER JOIN employees emp2
ON emp1.EmployeeId = emp2.ReportsTo
WHERE emp1.EmployeeId IS NULL OR emp2.ReportsTo IS NULL;

-- CROSS JOIN
-- Все пары сотрудников
SELECT emp1.FirstName, emp2.FirstName
FROM employees emp1
CROSS JOIN employees emp2;