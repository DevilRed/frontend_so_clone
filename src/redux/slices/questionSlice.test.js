import { describe, it, expect } from "vitest";
import {
  questionsSlice,
  setPage,
  filterQuestionsByTag,
  filterQuestionsByUser,
  clearFilter,
  fetchNextPrevPage,
} from "./questionSlice";

const initialState = {
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
};

describe("questionSlice", () => {
  it("should set page", () => {
    const state = questionsSlice.reducer(initialState, setPage(2));
    expect(state).toEqual({
      ...initialState,
      page: 2,
    });
  });
  it("should filter questions by tag", () => {
    const state = questionsSlice.reducer(
      initialState,
      filterQuestionsByTag("lala")
    );
    expect(state).toEqual({
      ...initialState,
      choosenTag: "lala",
      choosenUser: "",
      page: 1,
      showAll: true,
    });
  });
});
