import { test, expect } from '@playwright/test'

test.describe('Todo App — E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Чистим localStorage перед каждым тестом
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  // ─── Базовый сценарий ────────────────────────────────────────────────────

  test('страница загружается корректно', async ({ page }) => {
    await expect(page).toHaveTitle('Задачи')
    await expect(page.getByTestId('todo-input')).toBeVisible()
    await expect(page.getByTestId('add-btn')).toBeVisible()
    await expect(page.getByText('Список пуст')).toBeVisible()
  })

  // ─── Добавление ──────────────────────────────────────────────────────────

  test('добавляет задачу через кнопку', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Купить продукты')
    await page.getByTestId('add-btn').click()

    await expect(page.getByText('Купить продукты')).toBeVisible()
    await expect(page.getByTestId('todo-input')).toHaveValue('')
  })

  test('добавляет задачу через Enter', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Погулять с собакой')
    await page.getByTestId('todo-input').press('Enter')

    await expect(page.getByText('Погулять с собакой')).toBeVisible()
  })

  test('не добавляет пустую задачу', async ({ page }) => {
    await page.getByTestId('add-btn').click()

    await expect(page.getByText('Список пуст')).toBeVisible()
  })

  test('добавляет несколько задач', async ({ page }) => {
    const tasks = ['Первая задача', 'Вторая задача', 'Третья задача']

    for (const task of tasks) {
      await page.getByTestId('todo-input').fill(task)
      await page.getByTestId('todo-input').press('Enter')
    }

    await expect(page.getByTestId('todo-item')).toHaveCount(3)
    await expect(page.getByTestId('active-count')).toHaveText('3 активных')
  })

  // ─── Выполнение ──────────────────────────────────────────────────────────

  test('отмечает задачу выполненной', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Выполнить задачу')
    await page.getByTestId('todo-input').press('Enter')

    await page.getByTestId('todo-toggle').click()

    await expect(page.getByTestId('todo-item')).toHaveClass(/done/)
    await expect(page.getByTestId('done-count')).toHaveText('1 выполнено')
    await expect(page.getByTestId('active-count')).toHaveText('0 активных')
  })

  test('снимает отметку выполненной задачи', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Задача')
    await page.getByTestId('todo-input').press('Enter')

    await page.getByTestId('todo-toggle').click()
    await page.getByTestId('todo-toggle').click()

    await expect(page.getByTestId('todo-item')).not.toHaveClass(/done/)
    await expect(page.getByTestId('active-count')).toHaveText('1 активных')
  })

  // ─── Удаление ────────────────────────────────────────────────────────────

  test('удаляет задачу', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Временная задача')
    await page.getByTestId('todo-input').press('Enter')

    await page.getByTestId('todo-delete').click()

    await expect(page.getByText('Временная задача')).not.toBeVisible()
    await expect(page.getByText('Список пуст')).toBeVisible()
  })

  test('кнопка "Очистить выполненные" удаляет только done', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Активная')
    await page.getByTestId('todo-input').press('Enter')
    await page.getByTestId('todo-input').fill('Выполненная')
    await page.getByTestId('todo-input').press('Enter')

    // Выполняем первую задачу (она добавляется наверх)
    await page.getByTestId('todo-toggle').first().click()

    await page.getByTestId('clear-done').click()

    await expect(page.getByTestId('todo-item')).toHaveCount(1)
    await expect(page.getByText('Активная')).toBeVisible()
  })

  // ─── Фильтрация ──────────────────────────────────────────────────────────

  test('фильтры работают корректно', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Активная')
    await page.getByTestId('todo-input').press('Enter')
    await page.getByTestId('todo-input').fill('Выполненная')
    await page.getByTestId('todo-input').press('Enter')
    await page.getByTestId('todo-toggle').first().click()

    // Фильтр «Активные»
    await page.getByTestId('filter-active').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(1)

    // Фильтр «Готово»
    await page.getByTestId('filter-done').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(1)
    await expect(page.getByTestId('todo-item')).toHaveClass(/done/)

    // Фильтр «Все»
    await page.getByTestId('filter-all').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(2)
  })

  // ─── Приоритеты ──────────────────────────────────────────────────────────

  test('задачи с высоким приоритетом идут первыми', async ({ page }) => {
    await page.getByTestId('priority-low').click()
    await page.getByTestId('todo-input').fill('Низкий приоритет')
    await page.getByTestId('todo-input').press('Enter')

    await page.getByTestId('priority-high').click()
    await page.getByTestId('todo-input').fill('Высокий приоритет')
    await page.getByTestId('todo-input').press('Enter')

    const items = page.getByTestId('todo-item')
    await expect(items.first()).toContainText('Высокий приоритет')
  })

  // ─── Persistence ─────────────────────────────────────────────────────────

  test('задачи сохраняются после перезагрузки страницы', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Важная задача')
    await page.getByTestId('todo-input').press('Enter')

    await page.reload()

    await expect(page.getByText('Важная задача')).toBeVisible()
  })

  // ─── Accessibility ───────────────────────────────────────────────────────

  test('инпут получает фокус при загрузке страницы', async ({ page }) => {
    await expect(page.getByTestId('todo-input')).toBeFocused()
  })

  test('заголовок страницы корректный', async ({ page }) => {
    await expect(page).toHaveTitle(/Задачи/)
  })
})
