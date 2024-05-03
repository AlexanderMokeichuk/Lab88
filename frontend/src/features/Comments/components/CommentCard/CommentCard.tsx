import React from "react";
import {CommentApi} from "../../../../type";
import {Avatar, Card, CardContent, CardHeader, Grid} from "@mui/material";
import dayjs from "dayjs";

interface Props {
  comment: CommentApi,
}

const CommentCard: React.FC<Props> = ({comment}) => {
  return (
    <Card  sx={{width: 600}}>
      <Grid container direction={"column"}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "grey" }} aria-label="recipe"/>
          }
          title={comment.user.username}
          subheader={dayjs(comment.date).format("DD/MM/YYYY HH:mm")}
        />
        <CardContent>
          {comment.text}
        </CardContent>
      </Grid>
    </Card>
  );
};

export default CommentCard;