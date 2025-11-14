from sqlalchemy import text, select, func

from db.session import Session
from models import Film, Actor, FilmCategory, Category

# Создание сессии. Сессия - объект, хранящий промежуточные изменения в памяти для последующего применения
with Session() as session:
  query = session.query(Film).filter(Film.release_year > 2000).limit(5)
  print(query)
  res = query.all()

  print([[film.film_id, film.title, film.release_year] for film in res])

print()

with Session() as session:
  # Raw-запрос с параметром
  res = session.execute(text('SELECT * FROM actor LIMIT :limit'), { 'limit': 5 })
  print([[actor.actor_id, actor.first_name, actor.last_name, actor.last_update] for actor in res])

# print()

with Session() as session:
  # Сложный запрос с many-to-many join'ом, агрегацией и having
  query = select(Category.category_id, Category.name, func.count(Film.film_id)).join(Category.film_category).join(Film).group_by(Category.category_id).having(func.count(Film.film_id) > 1).order_by(func.count(Film.film_id).desc())
  print(query)
  res = session.execute(query).all()
  print(res)

with Session() as session:
  # Добавление записи в сессию
  session.add(Actor(first_name="Ivan", last_name="Ivanov"))

  # # Фиксация изменений, пользователь создастся в БД
  session.commit()