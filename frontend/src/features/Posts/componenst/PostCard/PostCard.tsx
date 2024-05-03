import React from "react";
import {Button, Card, CardContent, CardMedia, Grid} from "@mui/material";
import {API_URL} from "../../../../constants.ts";
import {PostApi} from "../../../../type";
import dayjs from "dayjs";
import chat from "./../../../../../public/chat.svg";
import {Link} from "react-router-dom";

interface Props {
  post: PostApi,
}

const PostCard: React.FC<Props> = ({post}) => {
  let image = chat;

  if (post.image) {
    image = API_URL + "/" + post.image;
  }

  return (
    <Card sx={{width: "90%"}}>
      <CardContent>
        <Grid container direction={"row"} gap={3}>
          <CardMedia
            component="img"
            image={image}
            sx={{
              height: 100,
              width: 100
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
          </Grid>

          <Grid item sx={{display: "flex", marginLeft: "auto", marginTop: "auto"}}>
            <Button variant={"contained"}>
              <Link to={`/post/${post._id}`} style={{textDecoration: "none"}}>Show more..</Link>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostCard;