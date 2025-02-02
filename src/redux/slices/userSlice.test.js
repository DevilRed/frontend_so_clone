import { describe, it, expect } from "vitest";
import {
  userSlice,
  setCurrentUser,
  setLoggedInOut,
  setToken,
} from "./userSlice";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: null,
};

describe("userSlice", () => {
  it("should set login state", () => {
    const state = userSlice.reducer(initialState, setLoggedInOut(true));
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
    });
  });

  it("should set current user", () => {
    const user = {
      id: 1,
      name: "Thulio",
      email: "thulio@gmail.com",
      image: "user.png",
      questionsCount: 5,
      answersCount: 4,
    };
    const state = userSlice.reducer(initialState, setCurrentUser(user));
    expect(state).toEqual({
      ...initialState,
      user,
    });
  });
  it("should set token", () => {
    const token = "abc123";
    const state = userSlice.reducer(initialState, setToken(token));
    expect(state).toEqual({
      ...initialState,
      token,
    });
  });
});
