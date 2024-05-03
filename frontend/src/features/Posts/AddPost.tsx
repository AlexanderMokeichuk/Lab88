import React, {useEffect} from "react";
import PostForm from "./componenst/PostForm/PostForm.tsx";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../Users/usersSlice.ts";

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Grid container justifyContent={"center"}>
      <PostForm />
    </Grid>
  );
};

export default AddPost;