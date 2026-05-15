import { useRef, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import "./index.css";
import { Filter, Priority } from "./utils/todos";

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: "high", label: "↑ высокий", color: "var(--high)" },
  { value: "medium", label: "→ средний", color: "var(--mid)" },
  { value: "low", label: "↓ низкий", color: "var(--low)" },
];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "done", label: "Готово" },
];

export default function App() {
  const {
    visible,
    filter,
    setFilter,
    add,
    toggle,
    remove,
    clear,
    activeCount,
    doneCount,
  } = useTodos();
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    add(text, priority);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="logo">ЗАДАЧИ</span>
          <div className="counters">
            <span data-testid="active-count">{activeCount} активных</span>
            <span className="sep">/</span>
            <span data-testid="done-count">{doneCount} выполнено</span>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Add form */}
        <div className="add-row" data-testid="add-form">
          <input
            ref={inputRef}
            className="text-input"
            placeholder="Новая задача..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            data-testid="todo-input"
          />
          <div className="priority-tabs">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                className={`prio-btn ${priority === p.value ? "active" : ""}`}
                style={{ "--pcolor": p.color } as React.CSSProperties}
                onClick={() => setPriority(p.value)}
                data-testid={`priority-${p.value}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button className="add-btn" onClick={handleAdd} data-testid="add-btn">
            + Добавить
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${filter === f.value ? "active" : ""}`}
              onClick={() => setFilter(f.value)}
              data-testid={`filter-${f.value}`}
            >
              {f.label}
            </button>
          ))}
          {doneCount > 0 && (
            <button
              className="clear-btn"
              onClick={clear}
              data-testid="clear-done"
            >
              Очистить выполненные
            </button>
          )}
        </div>

        {/* List */}
        <ul className="todo-list" data-testid="todo-list">
          {visible.length === 0 && (
            <li className="empty">
              {filter === "done" ? "Нет выполненных задач" : "Список пуст"}
            </li>
          )}
          {visible.map((todo) => {
            const p = PRIORITIES.find((x) => x.value === todo.priority)!;
            return (
              <li
                key={todo.id}
                className={`todo-item ${todo.done ? "done" : ""}`}
                data-testid="todo-item"
              >
                <span
                  className="prio-dot"
                  style={{ background: p.color }}
                  title={p.label}
                />
                <button
                  className="check-btn"
                  onClick={() => toggle(todo.id)}
                  data-testid="todo-toggle"
                  aria-label={
                    todo.done ? "Отметить активным" : "Отметить выполненным"
                  }
                >
                  {todo.done ? "✓" : "○"}
                </button>
                <span className="todo-text">{todo.text}</span>
                <button
                  className="del-btn"
                  onClick={() => remove(todo.id)}
                  data-testid="todo-delete"
                  aria-label="Удалить"
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
