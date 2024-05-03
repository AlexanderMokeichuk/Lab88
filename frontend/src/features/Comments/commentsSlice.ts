import {CommentApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchCommentsById, sendComment} from "./commentsThunks.ts";

interface CommentsSlice {
  comments: CommentApi[],
  commentLauding: boolean,
}

const InitialState: CommentsSlice = {
  comments: [],
  commentLauding: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsById.pending, (state) => {
      state.commentLauding = true;
    }).addCase(fetchCommentsById.fulfilled, (state, {payload: comments}: PayloadAction<CommentApi[]>) => {
      state.comments = comments;
      state.commentLauding = false;
    }).addCase(fetchCommentsById.rejected, (state) => {
      state.commentLauding = false;
    });

    builder.addCase(sendComment.pending, (state) => {
      state.commentLauding = true;
    }).addCase(sendComment.fulfilled, (state) => {
      state.commentLauding = false;
    }).addCase(sendComment.rejected, (state) => {
      state.commentLauding = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLauding = (state: RootState) => state.comments.commentLauding;


