import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { Input } from "../components/input";
import { Item } from "../components/item";
import type { ToDo } from "../types";

export default function TodosPage() {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const load = async () => {
    const res = await api.get<ToDo[]>("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (value: string) => {
    await api.post("/todos", { title: value });
    load();
  };

  const toggle = async (todo: ToDo) => {
    await api.patch(`/todos/${todo.id}`, {
      completed: !todo.completed,
    });
    load();
  };

  const remove = async (todo: ToDo) => {
    await api.delete(`/todos/${todo.id}`);
    load();
  };

  const update = async (todo: ToDo) => {
    await api.patch(`/todos/${todo.id}`, { title: todo.title });
    load();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos],
  );

  const currentFilter = searchParams.get("filter");

  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (currentFilter === "active") return !todo.completed;

        if (currentFilter === "completed") return todo.completed;

        return todo;
      }),
    [todos, currentFilter],
  );

  return (
    <>
      <header className="header" data-testid="header">
        <div className="header-container">
          <h1>todos</h1>

          <a onClick={logout}>Logout</a>
        </div>
        <Input
          onSubmit={add}
          label="New Todo Input"
          placeholder="What needs to be done?"
        />
      </header>
      {todos.length !== 0 && (
        <main className="main" data-testid="main">
          <ul className={"todo-list"} data-testid="todo-list">
            {visibleTodos.map((todo) => (
              <Item
                key={todo.id}
                todo={todo}
                onRemove={remove}
                onToggle={toggle}
                onUpdate={update}
              />
            ))}
          </ul>
        </main>
      )}
      <footer className="footer" data-testid="footer">
        <span className="todo-count">{`${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`}</span>
        <ul className="filters" data-testid="footer-navigation">
          <li>
            <a
              className={classNames({ selected: !currentFilter })}
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={classNames({ selected: currentFilter === "active" })}
              onClick={() => setSearchParams({ filter: "active" })}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={classNames({
                selected: currentFilter === "completed",
              })}
              onClick={() => setSearchParams({ filter: "completed" })}
            >
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
