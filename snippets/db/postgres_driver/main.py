import psycopg2

conn = psycopg2.connect("postgresql://postgres:@localhost:5432/dvdrental")
# или 
# conn = psycopg2.connect("dbname=test user=postgres")

cur = conn.cursor()

cur.execute("SELECT * FROM film LIMIT 10;")

records = cur.fetchall()

print(records)

cur.close()
conn.close()
