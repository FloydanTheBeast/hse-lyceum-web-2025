/**
 * TDD - Напишите функцию `calculateCartTotal` по набору тестов
 * Для запуска тестов используется jest:
 * `npx jest -- -t snippets/testing/tdd-exercise.spec.js`
 */

import { calculateCartTotal } from "./cart.js";

describe("calculateCartTotal - функция для подсчёта суммарной стоимости корзины", () => {
  test("считает сумму с одним товаром", () => {
    const items = [{ price: 100, qty: 2 }];
    expect(calculateCartTotal(items)).toBe(200);
  });

  test("считает сумму с несколькими товарами", () => {
    const items = [
      { price: 100, qty: 1 },
      { price: 50, qty: 3 },
    ];

    expect(calculateCartTotal(items)).toBe(250);
  });

  test("возвращает 0 для пустой корзины", () => {
    expect(calculateCartTotal([])).toBe(0);
  });

  test("игнорирует товары с некорректными данными", () => {
    const items = [
      { price: 100, qty: 2 },
      { price: -20, qty: 5 }, // некорректная цена
      { price: 50, qty: "abc" }, // некорректное количество
    ];

    expect(calculateCartTotal(items)).toBe(200);
  });

  test("применяет скидку 10% по промокоду 'SALE10'", () => {
    const items = [{ price: 200, qty: 1 }];

    expect(calculateCartTotal(items, "SALE10")).toBe(180);
  });

  test("промокод не может снизить цену ниже нуля", () => {
    const items = [{ price: 10, qty: 1 }];

    expect(calculateCartTotal(items, "SALE90")).toBe(1); // SALE90 = 90% скидки
  });

  test("неизвестный промокод не даёт скидки", () => {
    const items = [{ price: 200, qty: 1 }];

    expect(calculateCartTotal(items, "UNKNOWN")).toBe(200);
  });
});
