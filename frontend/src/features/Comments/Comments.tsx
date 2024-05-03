import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchCommentsById} from "./commentsThunks.ts";
import {Grid} from "@mui/material";
import {selectComments, selectCommentsLauding} from "./commentsSlice.ts";
import CommentCard from "./components/CommentCard/CommentCard.tsx";
import CommentsForm from "./components/CommentsForm/CommentsForm.tsx";
import Spinner from "../../UI/components/Spinner/Spinner.tsx";
import {selectUser} from "../Users/usersSlice.ts";

interface Props {
  id: string | undefined,
}

const Comments: React.FC<Props> = ({id}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const user = useAppSelector(selectUser);
  const lauding = useAppSelector(selectCommentsLauding);

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsById(id));
    } else {
      navigate("/");
    }
  }, [id, dispatch, navigate]);

  return (
    <Grid container direction={"column"} gap={2}>
      {user
        ? <CommentsForm id={id!}/>
        : undefined
      }

      <Grid item sx={{
        display: 'flex',
        flexDirection: "column",
        gap: 2,
      }}>
        {lauding
          ? <Grid container justifyContent={"center"}><Spinner /></Grid>
          : comments.map((comment) => {
            return <CommentCard key={comment._id} comment={comment} />;
          })
        }
      </Grid>
    </Grid>
  );
};

export default Comments;