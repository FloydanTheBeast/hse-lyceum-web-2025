import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AxiosError } from "axios";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

const mockPost = vi.fn();

vi.mock("../../api", () => ({
  default: {
    post: vi.fn().mockImplementation((...args) => mockPost(...args)),
  },
}));

describe("Login Page", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows typing username and password", async () => {
    const user = userEvent.setup();

    renderComponent();

    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);

    await user.type(username, "test");
    await user.type(password, "password");

    expect(username).toHaveValue("test");
    expect(password).toHaveValue("password");
  });

  it("submits login form", async () => {
    const user = userEvent.setup();

    mockPost.mockResolvedValueOnce({ data: { access_token: "token" } });

    renderComponent();

    await user.type(screen.getByPlaceholderText(/username/i), "test");
    await user.type(screen.getByPlaceholderText(/password/i), "test");

    await user.click(screen.getByRole("button", { name: /login/i }));

    const formData = new FormData();
    formData.append("username", "test");
    formData.append("password", "test");

    expect(mockPost).toHaveBeenCalledWith("/login", formData);
  });

  it("shows error on failed login", async () => {
    const user = userEvent.setup();

    mockPost.mockRejectedValueOnce(new AxiosError("invalid credentials"));

    renderComponent();

    await user.type(screen.getByPlaceholderText(/username/i), "test");
    await user.type(screen.getByPlaceholderText(/password/i), "wrong");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("disables button while loading", async () => {
    const user = userEvent.setup();

    mockPost.mockImplementation(() => new Promise(() => {}));

    renderComponent();

    await user.type(screen.getByPlaceholderText(/username/i), "test");
    await user.type(screen.getByPlaceholderText(/password/i), "test");

    const button = screen.getByRole("button", { name: /login/i });
    await user.click(button);

    expect(button).toBeDisabled();
  });
});
