import React from "react";
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import {API_URL} from "../../../../constants.ts";
import {PostApi} from "../../../../type";
import dayjs from "dayjs";
import chat from "./../../../../../public/chat.svg";

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

          <Grid item>
            <span>{dayjs(post.date).format("DD/MM/YYYY HH:mm")} by <strong>{post.user.username}</strong></span>
            <p>{post.title}</p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostCard;