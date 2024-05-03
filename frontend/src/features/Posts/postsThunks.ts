import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {PostApi} from "../../type";

export const fetchPosts = createAsyncThunk<PostApi[], undefined>(
  "posts/fetchPosts",
  async () => {
    try {
      const {data: response} = await axiosApi.get<PostApi[]>("/posts");
      return response;
    } catch (e) {
      return [];
    }
  },
);
