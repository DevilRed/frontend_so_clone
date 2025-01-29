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
      let response = null;
      if (choosenUser) {
        response = await axios.post(query, { user_id: choosenUser });
      } else {
        response = await axios.get(query);
      }
      return {
        data: response.data.data, // List of questions
        meta: response.data.meta, // Pagination metadata
        links: response.data.meta.links, // Links for navigation
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: {
      data: [], // List of questions
      meta: null, // Pagination metadata
    },
    loading: false,
    page: 1,
    error: null,
    choosenTag: "",
    choosenUser: "",
    nexPageLink: null,
    prevPageLink: null,
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
    fetchNextPrevPage: (state, action) => {
      const url = new URL(action.payload);
      state.page = Number(url.searchParams.get("page"));
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

        // save pagination links to state (if available)
        const links = action.payload.links || {};
        state.nextPageLink = links.next || null;
        state.prevPageLink = links.prev || null;
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
  fetchNextPrevPage,
} = questionsSlice.actions;

export default questionsSlice.reducer;
