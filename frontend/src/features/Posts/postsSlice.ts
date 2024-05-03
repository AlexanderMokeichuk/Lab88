import {PostApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchPosts} from "./postsThunks.ts";

interface PostsSlice {
  posts: PostApi[],
  postsLauding: boolean,
}

const InitialState: PostsSlice = {
  posts: [],
  postsLauding: false,
};

const postsSLice = createSlice({
  name: "posts",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsLauding = true;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, {payload: posts}: PayloadAction<PostApi[]>) => {
          state.posts = posts;
          state.postsLauding = false;
        },
      )
      .addCase(fetchPosts.rejected, (state) => {
        state.postsLauding = false;
      });
  },
});

export const postsReducer = postsSLice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLauding = (state: RootState) =>
  state.posts.postsLauding;
