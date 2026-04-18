import classnames from "classnames";
import { memo, useCallback, useState } from "react";

import { Input } from "./input";

import type { ToDo } from "../types";

type ItemProps = {
  todo: ToDo;
  onToggle: (todo: ToDo) => Promise<void>;
  onUpdate: (todo: ToDo) => Promise<void>;
  onRemove: (todo: ToDo) => Promise<void>;
};

export const Item = memo(function Item({
  todo,
  onToggle,
  onUpdate,
  onRemove,
}: ItemProps) {
  const [isWritable, setIsWritable] = useState(false);
  const { title, completed, id } = todo;

  const toggleItem = () => onToggle(todo);
  const removeItem = () => onRemove(todo);
  const updateItem = (title: string) => onUpdate({ ...todo, title });

  const handleDoubleClick = useCallback(() => {
    setIsWritable(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsWritable(false);
  }, []);

  const handleUpdate = useCallback(
    (title: string) => {
      if (title.length === 0) removeItem();
      else updateItem(title);

      setIsWritable(false);
    },
    [id, removeItem, updateItem],
  );

  return (
    <li
      className={classnames({ completed: todo.completed })}
      data-testid="todo-item"
    >
      <div className="view">
        {isWritable ? (
          <Input
            onSubmit={handleUpdate}
            label="Edit Todo Input"
            defaultValue={title}
            onBlur={handleBlur}
          />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed}
              onChange={toggleItem}
            />
            <label
              data-testid="todo-item-label"
              onDoubleClick={handleDoubleClick}
            >
              {title}
            </label>
            <button
              className="destroy"
              data-testid="todo-item-button"
              onClick={removeItem}
            />
          </>
        )}
      </div>
    </li>
  );
});
