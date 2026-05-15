import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../src/App'

// Мокаем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
  vi.spyOn(crypto, 'randomUUID').mockReturnValue('test-uuid-0000-0000-0000-000000000000')
})

describe('App — добавление задач', () => {
  it('добавляет задачу по кнопке', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('todo-input'), 'Купить хлеб')
    await user.click(screen.getByTestId('add-btn'))

    expect(screen.getByText('Купить хлеб')).toBeInTheDocument()
  })

  it('добавляет задачу по Enter', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('todo-input'), 'Сделать домашку{Enter}')

    expect(screen.getByText('Сделать домашку')).toBeInTheDocument()
  })

  it('не добавляет пустую задачу', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('add-btn'))

    expect(screen.queryAllByTestId('todo-item')).toHaveLength(0)
  })

  it('очищает инпут после добавления', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('todo-input'), 'Задача{Enter}')

    expect(screen.getByTestId('todo-input')).toHaveValue('')
  })

  it('счётчик обновляется после добавления', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('todo-input'), 'Первая{Enter}')
    await user.type(screen.getByTestId('todo-input'), 'Вторая{Enter}')

    expect(screen.getByTestId('active-count')).toHaveTextContent('2 активных')
  })
})

describe('App — выполнение задач', () => {
  it('помечает задачу выполненной', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('todo-input'), 'Задача{Enter}')
    await user.click(screen.getByTestId('todo-toggle'))

    const item = screen.getByTestId('todo-item')
    expect(item).toHaveClass('done')
  })

  it('счётчик done обновляется', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('todo-input'), 'Задача{Enter}')
    await user.click(screen.getByTestId('todo-toggle'))

    expect(screen.getByTestId('done-count')).toHaveTextContent('1 выполнено')
    expect(screen.getByTestId('active-count')).toHaveTextContent('0 активных')
  })
})

describe('App — удаление задач', () => {
  it('удаляет задачу', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByTestId('todo-input'), 'Удалить меня{Enter}')
    await user.click(screen.getByTestId('todo-delete'))

    expect(screen.queryByText('Удалить меня')).not.toBeInTheDocument()
  })

  it('кнопка "очистить выполненные" появляется только когда есть выполненные', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.queryByTestId('clear-done')).not.toBeInTheDocument()

    await user.type(screen.getByTestId('todo-input'), 'Задача{Enter}')
    await user.click(screen.getByTestId('todo-toggle'))

    expect(screen.getByTestId('clear-done')).toBeInTheDocument()

    await user.click(screen.getByTestId('clear-done'))

    expect(screen.queryByTestId('clear-done')).not.toBeInTheDocument()
  })
})

describe('App — фильтрация', () => {
  async function addAndToggle() {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByTestId('todo-input'), 'Активная{Enter}')
    await user.type(screen.getByTestId('todo-input'), 'Выполненная{Enter}')
    await user.click(screen.getAllByTestId('todo-toggle')[0])
    return user
  }

  it('фильтр "Активные" показывает только активные', async () => {
    const user = await addAndToggle()
    await user.click(screen.getByTestId('filter-active'))
    const items = screen.getAllByTestId('todo-item')
    expect(items).toHaveLength(1)
  })

  it('фильтр "Готово" показывает только выполненные', async () => {
    const user = await addAndToggle()
    await user.click(screen.getByTestId('filter-done'))
    const items = screen.getAllByTestId('todo-item')
    expect(items).toHaveLength(1)
    expect(items[0]).toHaveClass('done')
  })

  it('фильтр "Все" показывает всё', async () => {
    const user = await addAndToggle()
    await user.click(screen.getByTestId('filter-active'))
    await user.click(screen.getByTestId('filter-all'))
    expect(screen.getAllByTestId('todo-item')).toHaveLength(2)
  })
})

describe('App — приоритеты', () => {
  it('можно выбрать приоритет перед добавлением', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('priority-high'))
    await user.type(screen.getByTestId('todo-input'), 'Срочно{Enter}')

    expect(screen.getByText('Срочно')).toBeInTheDocument()
  })
})

describe('App — пустой список', () => {
  it('показывает сообщение когда список пуст', () => {
    render(<App />)
    expect(screen.getByText('Список пуст')).toBeInTheDocument()
  })

  it('показывает правильное сообщение для фильтра done', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByTestId('filter-done'))
    expect(screen.getByText('Нет выполненных задач')).toBeInTheDocument()
  })
})
