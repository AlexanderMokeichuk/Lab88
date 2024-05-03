import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Post, PostApi} from "../../type";
import {RootState} from "../../app/store.ts";

export const sendPostToApi = createAsyncThunk<void, Post, { state: RootState }>(
  "posts/sendPost",
  async (post, { getState }) => {
    const formData = new FormData();

    const keys = Object.keys(post) as (keyof Post)[];
    keys.forEach((key) => {
      const value = post[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const token = getState().users.user?.token;

      await axiosApi.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
);

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

export const fetchOnePost = createAsyncThunk<PostApi | null, string>(
  "posts/fetchOnePost",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get<PostApi>(`/posts/${id}`);
      return response;
    } catch (e) {
      return null;
    }
  },
);