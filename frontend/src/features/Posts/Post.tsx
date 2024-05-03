import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchOnePost} from "./postsThunks.ts";
import {selectPost} from "./postsSlice.ts";
import {CardMedia, Grid} from "@mui/material";
import dayjs from "dayjs";
import chat from "./../../../public/chat.svg";
import {API_URL} from "../../constants.ts";
import Spinner from "../../UI/components/Spinner/Spinner.tsx";
import Comments from "../Comments/Comments.tsx";


const Post: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
    } else {
      navigate("/");
    }
  }, [id, dispatch, navigate]);

  let image = chat;

  if (post) {
    if (post.image) {
      image = API_URL + "/" + post.image;
    }
  }

  return (
    <Grid container justifyContent={"center"}>
      {
        !post
          ? <Spinner/>
          : (
            <Grid container direction={"column"} gap={2}>
              <Grid container direction={"row"} gap={3} bgcolor={"white"}>
                <CardMedia
                  component="img"
                  image={image}
                  sx={{
                    height: 200,
                    width: 200
                  }}
                  alt="Paella dish"
                />

                <Grid item sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}>
                  <div>{dayjs(post.date).format("DD/MM/YYYY HH:mm")} by <strong>{post.user.username}</strong></div>
                  <strong>{post.title}</strong>
                  <div>{post.description}</div>
                </Grid>
              </Grid>

              <Comments id={id}/>
            </Grid>
          )
      }
    </Grid>
  );
};

export default Post;