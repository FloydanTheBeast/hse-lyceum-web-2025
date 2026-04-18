import { useCallback } from "react";

const sanitize = (string) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
};

const hasValidMin = (value, min) => {
  return value.length >= min;
};

type InputProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export function Input({
  label,
  placeholder,
  defaultValue,
  onSubmit,
  onBlur,
}: InputProps) {
  const handleKeyDown = useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (e) => {
      if (e.key === "Enter") {
        const value = e.target.value.trim();

        if (!hasValidMin(value, 2)) return;

        onSubmit(sanitize(value));
        e.target.value = "";
      }
    },
    [onSubmit],
  );

  return (
    <div className="input-container">
      <input
        className="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
      <label className="visually-hidden" htmlFor="todo-input">
        {label}
      </label>
    </div>
  );
}
