import { expect, test } from "@playwright/test";

test("register, login and logout", async ({ page }) => {
  const username = `user_${Date.now()}`;
  const password = "test123";

  // Открываем страницу регистрации
  await page.goto("/register");

  // Регистрация
  await page.fill('[placeholder="Username"]', username);
  await page.fill('[placeholder="Password"]', password);

  await page.click('button:has-text("Register")');

  // Проверяем редирект после регистрации
  await expect(page).toHaveURL("/");

  await page.click("text=Logout");

  expect(await page.evaluate(() => localStorage.getItem("token"))).toBeNull();

  // Переходим на login
  await page.goto("/login");

  // Логин
  await page.fill('[placeholder="Username"]', username);
  await page.fill('[placeholder="Password"]', password);

  await page.click('button:has-text("Login")');

  // Проверка успешного логина
  await expect(page).toHaveURL("/");
});
