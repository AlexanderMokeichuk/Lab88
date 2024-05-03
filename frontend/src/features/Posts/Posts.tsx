import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchPosts } from './postsThunks.ts';
import { selectPosts, selectPostsLauding } from './postsSlice.ts';
import PostCard from "./componenst/PostCard/PostCard.tsx";
import {Grid} from "@mui/material";
import Spinner from "../../UI/components/Spinner/Spinner.tsx";

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const lauding = useAppSelector(selectPostsLauding);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid container justifyContent={"center"} gap={2}>
      <>
        {
          lauding
            ? <Spinner />
            : posts.map((item) => {
              return <PostCard key={item._id} post={item} />;
            })
        }
      </>
    </Grid>
  );
};

export default Posts;
