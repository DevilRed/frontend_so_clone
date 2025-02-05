import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../tests/test-util";
import { Answer } from "./Answer";
import { BrowserRouter } from "react-router-dom";

vi.mock("html-to-react", () => ({
  Parser: () => ({
    parse: (html) => html,
  }),
}));

// mock data
const mockAnswer = {
  id: 1,
  body: "Test answer body",
  score: 5,
  created_at: "2 days ago",
  best_answer: false,
  user: {
    id: 2,
    name: "Jane Doe",
    image: "test-image.jpg",
  },
};

const mockQuestion = {
  id: 1,
  user: {
    id: 1,
  },
};

const renderAnswerWithRouter = (preloadedState = {}) => {
  return renderWithProviders(
    <BrowserRouter>
      <Answer answer={mockAnswer} question={mockQuestion} />
    </BrowserRouter>,
    { preloadedState }
  );
};

describe("Answer compnent", () => {
  it("should render answer data correctly", () => {
    renderAnswerWithRouter({
      user: { isLoggedIn: false, token: null },
    });
    expect(screen.getByText("Test answer body")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Asked 2 days ago")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByAltText("user image")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
  });
});
