import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comment, CommentApi} from "../../type";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const fetchCommentsById = createAsyncThunk<CommentApi[], string>(
  "comments/fetchCommentsById",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get(`/comments/${id}`);
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const sendComment = createAsyncThunk<void, Comment, { state: RootState }>(
  "comments/sendComment",
  async (comment, { getState }) => {
    const token = getState().users.user?.token;

    try {
      await axiosApi.post(`/comments`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
);