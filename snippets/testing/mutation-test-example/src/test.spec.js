/**
 * Пример кода мутационного тестирования
 * Запуск: `npx stryker run -- -t snippets/testing/mutation-test-example.spec.js`
 */

const { isAdult } = require("./isAdult");

describe('isAdult - функция проверки возраста на "взрослость"', () => {
  it("возвращает true для взрослых", () => {
    expect(isAdult(20)).toBe(true);
  });

  it("возвращает false для несовершеннолетних", () => {
    expect(isAdult(16)).toBe(false);
  });

  // Этот тест убьёт единственного "мутанта"
  // it("точно 18 считается взрослым", () => {
  //   expect(isAdult(18)).toBe(true);
  // });
});
