import React from "react";
import PostForm from "./componenst/PostForm/PostForm.tsx";
import {Grid} from "@mui/material";

const AddPost: React.FC = () => {
  return (
    <Grid container justifyContent={"center"}>
      <PostForm />
    </Grid>
  );
};

export default AddPost;