import { describe, it, expect, vi } from "vitest";
import {
  questionsSlice,
  setPage,
  filterQuestionsByTag,
  filterQuestionsByUser,
  clearFilter,
  fetchNextPrevPage,
} from "./questionSlice";

import { initialState } from "../../../tests/fixtures/questionSliceFixture";

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
  it("should filter questions by user", () => {
    const state = questionsSlice.reducer(
      initialState,
      filterQuestionsByUser(55)
    );
    expect(state).toEqual({
      ...initialState,
      choosenTag: "",
      choosenUser: 55,
      page: 1,
      showAll: true,
    });
  });
  it("should clear filter", () => {
    const state = questionsSlice.reducer(initialState, clearFilter());
    expect(state).toEqual({
      ...initialState,
      choosenTag: "",
      choosenUser: "",
      page: 1,
      showAll: false,
    });
  });
  it("should fetch next prev page", () => {
    const pageNumber = "5";
    // Mock the URL constructor
    const mockURL = vi.fn().mockImplementation((url) => {
      return {
        searchParams: {
          get: vi.fn().mockReturnValue(pageNumber), // Mock the page number
        },
      };
    });
    // Replace the global URL constructor with the mock
    global.URL = mockURL;

    // Create a mock action
    const action = { payload: "http://example.com?page=5" };

    const state = questionsSlice.reducer(
      initialState,
      fetchNextPrevPage(action.payload)
    );

    expect(state.page).toBe(Number(pageNumber));

    // Restore the original URL constructor
    global.URL = URL;
  });
});
