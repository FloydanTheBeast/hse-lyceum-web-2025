export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: string
  text: string
  done: boolean
  priority: Priority
  createdAt: number
}

export type Filter = 'all' | 'active' | 'done'

export function createTodo(text: string, priority: Priority = 'medium'): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    priority,
    createdAt: Date.now(),
  }
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map(t => (t.id === id ? { ...t, done: !t.done } : t))
}

export function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter(t => t.id !== id)
}

export function clearDone(todos: Todo[]): Todo[] {
  return todos.filter(t => !t.done)
}

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === 'active') return todos.filter(t => !t.done)
  if (filter === 'done')   return todos.filter(t => t.done)
  return todos
}

export function sortByPriority(todos: Todo[]): Todo[] {
  const rank: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
  return [...todos].sort((a, b) => rank[a.priority] - rank[b.priority])
}

export function countActive(todos: Todo[]): number {
  return todos.filter(t => !t.done).length
}
