import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createTodo, toggleTodo, removeTodo, clearDone,
  filterTodos, sortByPriority, countActive,
} from '../../src/utils/todos'

// Фиксируем crypto.randomUUID для воспроизводимых тестов
beforeEach(() => {
  let counter = 0
  vi.spyOn(crypto, 'randomUUID').mockImplementation(() => `id-${++counter}` as `${string}-${string}-${string}-${string}-${string}`)
})

describe('createTodo', () => {
  it('создаёт задачу с правильными полями', () => {
    const todo = createTodo('Купить молоко', 'high')
    expect(todo.text).toBe('Купить молоко')
    expect(todo.priority).toBe('high')
    expect(todo.done).toBe(false)
    expect(todo.id).toBeDefined()
  })

  it('обрезает пробелы в тексте', () => {
    const todo = createTodo('  Задача с пробелами  ')
    expect(todo.text).toBe('Задача с пробелами')
  })

  it('использует medium как приоритет по умолчанию', () => {
    const todo = createTodo('Без приоритета')
    expect(todo.priority).toBe('medium')
  })

  it('каждая задача получает уникальный id', () => {
    const a = createTodo('Первая')
    const b = createTodo('Вторая')
    expect(a.id).not.toBe(b.id)
  })
})

describe('toggleTodo', () => {
  it('переключает задачу в done', () => {
    const todo = createTodo('Тест')
    const result = toggleTodo([todo], todo.id)
    expect(result[0].done).toBe(true)
  })

  it('переключает done задачу обратно в активную', () => {
    const todo = { ...createTodo('Тест'), done: true }
    const result = toggleTodo([todo], todo.id)
    expect(result[0].done).toBe(false)
  })

  it('не затрагивает другие задачи', () => {
    const a = createTodo('A')
    const b = createTodo('B')
    const result = toggleTodo([a, b], a.id)
    expect(result[1].done).toBe(false)
  })

  it('возвращает новый массив (иммутабельность)', () => {
    const todos = [createTodo('Тест')]
    const result = toggleTodo(todos, todos[0].id)
    expect(result).not.toBe(todos)
  })
})

describe('removeTodo', () => {
  it('удаляет задачу по id', () => {
    const a = createTodo('A')
    const b = createTodo('B')
    const result = removeTodo([a, b], a.id)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(b.id)
  })

  it('ничего не делает при несуществующем id', () => {
    const todos = [createTodo('A')]
    const result = removeTodo(todos, 'non-existent')
    expect(result).toHaveLength(1)
  })
})

describe('clearDone', () => {
  it('удаляет все выполненные задачи', () => {
    const a = { ...createTodo('A'), done: true }
    const b = createTodo('B')
    const c = { ...createTodo('C'), done: true }
    const result = clearDone([a, b, c])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(b.id)
  })

  it('возвращает тот же список если нет выполненных', () => {
    const todos = [createTodo('A'), createTodo('B')]
    expect(clearDone(todos)).toHaveLength(2)
  })
})

describe('filterTodos', () => {
  const active = createTodo('Активная')
  const done = { ...createTodo('Выполненная'), done: true }
  const all = [active, done]

  it('фильтр "all" возвращает всё', () => {
    expect(filterTodos(all, 'all')).toHaveLength(2)
  })

  it('фильтр "active" возвращает только активные', () => {
    const result = filterTodos(all, 'active')
    expect(result).toHaveLength(1)
    expect(result[0].done).toBe(false)
  })

  it('фильтр "done" возвращает только выполненные', () => {
    const result = filterTodos(all, 'done')
    expect(result).toHaveLength(1)
    expect(result[0].done).toBe(true)
  })
})

describe('sortByPriority', () => {
  it('сортирует high → medium → low', () => {
    const low    = { ...createTodo('low'),    priority: 'low'    } as const
    const medium = { ...createTodo('medium'), priority: 'medium' } as const
    const high   = { ...createTodo('high'),   priority: 'high'   } as const
    const result = sortByPriority([low, medium, high])
    expect(result.map(t => t.priority)).toEqual(['high', 'medium', 'low'])
  })

  it('не мутирует исходный массив', () => {
    const todos = [createTodo('A'), createTodo('B')]
    const original = [...todos]
    sortByPriority(todos)
    expect(todos).toEqual(original)
  })
})

describe('countActive', () => {
  it('считает только активные задачи', () => {
    const todos = [
      createTodo('A'),
      { ...createTodo('B'), done: true },
      createTodo('C'),
    ]
    expect(countActive(todos)).toBe(2)
  })

  it('возвращает 0 для пустого списка', () => {
    expect(countActive([])).toBe(0)
  })
})
