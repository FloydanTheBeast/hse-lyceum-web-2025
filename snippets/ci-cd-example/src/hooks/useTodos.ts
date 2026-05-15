import { useCallback, useState } from "react";
import {
  Filter,
  Priority,
  Todo,
  clearDone,
  countActive,
  createTodo,
  filterTodos,
  removeTodo,
  sortByPriority,
  toggleTodo,
} from "../utils/todos";

const STORAGE_KEY = "todos";

function load(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(load);
  const [filter, setFilter] = useState<Filter>("all");

  const update = useCallback((next: Todo[]) => {
    setTodos(next);
    save(next);
  }, []);

  const add = useCallback(
    (text: string, priority: Priority) => {
      if (!text.trim()) return;
      update([createTodo(text, priority), ...todos]);
    },
    [todos, update],
  );

  const toggle = useCallback(
    (id: string) => {
      update(toggleTodo(todos, id));
    },
    [todos, update],
  );

  const remove = useCallback(
    (id: string) => {
      update(removeTodo(todos, id));
    },
    [todos, update],
  );

  const clear = useCallback(() => {
    update(clearDone(todos));
  }, [todos, update]);

  const visible = sortByPriority(filterTodos(todos, filter));
  const activeCount = countActive(todos);
  const doneCount = todos.length - activeCount;

  return {
    visible,
    filter,
    setFilter,
    add,
    toggle,
    remove,
    clear,
    activeCount,
    doneCount,
  };
}
