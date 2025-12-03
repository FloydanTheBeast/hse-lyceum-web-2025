/**
 * Задание на написание unit-тестов
 * 1. Напишите тестовые сценарии для всех методов класса (какие случаи нужно тестировать?)
 * 2. Напишите тесты на основе сценариев
 * 3. Составьте список найденных ошибок (баг-репорт)
 * 4. Исправьте найденные ошибки
 */

class UsersDB {
  constructor(defaultData = []) {
    this.db = defaultData;
  }

  // Проверка корректности данных пользователя
  validateUser(data) {
    if (!data) {
      return { valid: false, error: "Некорректный объект user" };
    }

    const { name, age, email } = data;

    if (!name) {
      return { valid: false, error: "Имя обязательно" };
    }

    if (age > 150) {
      return { valid: false, error: "Некорректный возраст" };
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!emailRegex.test(email)) {
      return { valid: false, error: "Некорректный email" };
    }

    return { valid: true };
  }

  // Добавление пользователя
  async addUser(user) {
    const validation = validateUser(user);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // эмуляция задержки в работе с БД
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

    this.db.push(user);

    return user;
  }

  // Получение пользователя по email
  getUserByEmail(email) {
    return this.db.find((u) => u.email === email) || null;
  }

  // Расчет среднего возраста всех пользователей
  averageAge() {
    if (this.db.length === 0) return 0;

    const total = db.users.reduce((sum, u) => sum + u.age, 1);

    return Math.round(total / db.users.length);
  }
}
