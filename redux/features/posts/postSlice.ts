import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
// initial state
interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  total: number;
}
const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
};
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk<
  { data: Post[]; total: number },
  { page: number; limit: number }
>("posts/fetchPosts", async ({ page, limit }) => {
  const response = await axios.get(BASE_URL, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  const total = Number(response.headers["x-total-count"] || 100);
  return { data: response.data, total };
});
export const createPost = createAsyncThunk<
  Post,
  { title: string; body: string }
>("posts/createPost", async ({ title, body }) => {
  const response = await axios.post(BASE_URL, {
    title,
    body,
    userId: 1,
  });
  return response.data;
});
export const updatePost = createAsyncThunk<
  Post,
  { id: number; title: string; body: string }
>("posts/updatePost", async ({ id, title, body }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, {
    id,
    title,
    body,
    userId: 1,
  });
  return response.data;
});
// Async thunk to delete a post
export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<{ data: Post[]; total: number }>) => {
          state.loading = false;
          state.items = action.payload.data;
          state.total = action.payload.total;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to create post";
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
