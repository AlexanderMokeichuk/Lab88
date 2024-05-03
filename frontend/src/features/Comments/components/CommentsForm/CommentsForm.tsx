import React, {ChangeEvent, FormEvent, useState} from "react";
import {Avatar, IconButton, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {resetUser, selectPostsLauding} from "../../../Posts/postsSlice.ts";
import SendIcon from "@mui/icons-material/Send";
import {fetchCommentsById, sendComment} from "../../commentsThunks.ts";
import {fetchOnePost} from "../../../Posts/postsThunks.ts";
import {selectUser} from "../../../Users/usersSlice.ts";


const defaultState = {
  text: "",
};

interface Props {
  id: string,
}
const CommentsForm: React.FC<Props> = ({id}) => {
  const [formState, setFormState] = useState(defaultState);
  const dispatch = useAppDispatch();
  const btnLauding = useAppSelector(selectPostsLauding);
  const user = useAppSelector(selectUser);

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetUser());
    await dispatch(fetchOnePost(id));
    await dispatch(sendComment({
      ...formState,
      post: id,
    }));
    await dispatch(fetchCommentsById(id));
    setFormState(defaultState);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20 ,
        background: "white",
        padding: 5,
        width: "80%",
        borderRadius: 8,
        border: "solid blue 1px",
        borderColor: "blue"
      }}
    >

      <Avatar>{user?.username[0]}</Avatar>
      <TextField
        fullWidth
        name={"text"}
        required={true}

        value={formState.text}
        onChange={onChangeForm}
      />



      <IconButton
        disabled={btnLauding}
        color={"primary"}
        type={"submit"}
      >
        <SendIcon />
      </IconButton>
</form>
)
  ;
};

export default CommentsForm;