import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnvironments } from "../../helpers/getEnvironments";

const { VITE_BASE_URL } = getEnvironments();

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async ({ page, choosenTag, choosenUser }, { rejectWithValue }) => {
    let query = `${VITE_BASE_URL}/api/questions?page=${page}`;

    if (choosenTag) {
      query = `${VITE_BASE_URL}/api/tag/${choosenTag}/questions?page=${page}`;
    } else if (choosenUser) {
      query = `${VITE_BASE_URL}/api/user/questions?page=${page}`;
    }

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
    choosenTag: "",
    choosenUser: "",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    filterQuestionsByTag: (state, action) => {
      state.choosenTag = action.payload;
      state.choosenUser = "";
      state.page = 1;
    },
    filterQuestionsByUser: (state, action) => {
      state.choosenUser = action.payload;
      state.choosenTag = "";
      state.page = 1;
    },
    clearFilter: (state) => {
      state.choosenUser = "";
      state.choosenTag = "";
      state.page = 1;
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

export const {
  setPage,
  filterQuestionsByTag,
  filterQuestionsByUser,
  clearFilter,
} = questionsSlice.actions;

export default questionsSlice.reducer;
