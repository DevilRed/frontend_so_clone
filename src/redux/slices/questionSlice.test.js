import { describe, it, expect } from "vitest";
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
});
