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
});
