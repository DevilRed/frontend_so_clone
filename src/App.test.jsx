import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./redux/slices/userSlice";
import questionsReducer from "./redux/slices/questionSlice";
import App from "./App";

const store = configureStore({
  reducer: {
    user: userReducer,
    questions: questionsReducer,
  },
  preloadedState: {
    user: {
      isLoggedIn: false,
      token: "",
      user: null,
    },
    questions: {
      questions: {
        data: [], // List of questions
        meta: null, // Pagination metadata
      },
      question: null,
      loading: false,
      page: 1,
      error: null,
      choosenTag: "",
      choosenUser: "",
      nexPageLink: null,
      prevPageLink: null,
      showAll: false,
    },
  },
});

describe("App", () => {
  it("should render ok", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText("React Stack")).toBeInTheDocument();
  });
});
