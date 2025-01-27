import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnvironments } from "../../helpers/getEnvironments";

const { VITE_BASE_URL } = getEnvironments();

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async ({ page }, { rejectWithValue }) => {
    let query = `${VITE_BASE_URL}/api/questions?page=${page}`;

    try {
      const response = await axios.get(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    page: 1,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = questionsSlice.actions;

export default questionsSlice.reducer;
