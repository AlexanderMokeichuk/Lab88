import {PostApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchOnePost, fetchPosts, sendPostToApi} from "./postsThunks.ts";

interface PostsSlice {
  posts: PostApi[],
  post: PostApi | null,
  postsLauding: boolean,
}

const InitialState: PostsSlice = {
  posts: [],
  post: null,
  postsLauding: false,
};

const postsSLice = createSlice({
  name: "posts",
  initialState: InitialState,
  reducers: {
    resetUser: (state) => {
      state.post = null;
    }
  },
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

    builder.addCase(sendPostToApi.pending, (state) => {
      state.postsLauding = true;
    }).addCase(sendPostToApi.fulfilled, (state) => {
      state.postsLauding = false;
    }).addCase(sendPostToApi.rejected, (state) => {
      state.postsLauding = false;
    });

    builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}: PayloadAction<PostApi | null>) => {
      state.post = post;
    });
  },
});


export const { resetUser } = postsSLice.actions;

export const postsReducer = postsSLice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
export const selectPostsLauding = (state: RootState) => state.posts.postsLauding;

