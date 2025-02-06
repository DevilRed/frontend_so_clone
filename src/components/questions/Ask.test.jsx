import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { renderWithProviders } from "../../../tests/test-util";
import { Ask } from "./Ask";

// Mocks
vi.mock("axios");
vi.mock("react-toastify");
/* jest.mock("../../helpers/getEnvironments", () => ({
  getEnvironments: () => ({ VITE_BASE_URL: "http://test.com" }),
})); */

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
// mock store
const renderWithRouter = (preloadedState = {}) => {
  return renderWithProviders(
    <BrowserRouter>
      <Ask />
    </BrowserRouter>
  );
};

describe("Ask Component", () => {
  /* const mockStore = {
    getState: () => ({
      user: {
        isLoggedIn: true,
        token: "test-token",
      },
    }),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  }; */

  /* const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Ask />
        </BrowserRouter>
      </Provider>
    );
  }; */

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to login if user is not logged in", () => {
    renderWithRouter({
      user: { isLoggedIn: false, token: null },
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("renders form elements correctly", () => {
    renderWithRouter({
      user: { isLoggedIn: true, token: "test-token" },
    });

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/body/i)).toBeInTheDocument();
    expect(screen.getByText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "Question created successfully" },
    });

    renderWithRouter({
      user: { isLoggedIn: true, token: "test-token" },
    });

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "Test Question" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/question/store"),
        expect.objectContaining({ title: "Test Question" }),
        expect.any(Object)
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Question created successfully"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  /* it("handles validation errors", async () => {
    const validationErrors = {
      response: {
        status: 422,
        data: {
          errors: {
            title: ["Title is required"],
            body: ["Body is required"],
          },
        },
      },
    };

    axios.post.mockRejectedValueOnce(validationErrors);

    renderComponent();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Body is required")).toBeInTheDocument();
    });
  }); */
});
