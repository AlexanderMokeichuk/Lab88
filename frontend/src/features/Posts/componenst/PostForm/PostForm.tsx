import React, {ChangeEvent, FormEvent, useState} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import {Post} from "../../../../type";
import {AccountCircle} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import FileInput from "../../../../UI/components/FileInput/FileInput.tsx";
import {selectPostsLauding} from "../../postsSlice.ts";
import {sendPostToApi} from "../../postsThunks.ts";

const defaultState: Post = {
  title: "",
  description: "",
  image: null,
};


const PostForm: React.FC = () => {
  const [formState, setFormState] = useState<Post>(defaultState);
  const dispatch = useAppDispatch();
  const btnLauding = useAppSelector(selectPostsLauding);

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setFormState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(sendPostToApi(formState));
    setFormState(defaultState);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: 400,
        background: "white",
        borderRadius: 8,
      }}
    >
      <Grid
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: 2,
          }}>
          <AccountCircle sx={{color: "action.active", mr: 1, my: 0.5}}/>
          <TextField
            id="input-with-sx"
            name={"title"}
            required={true}
            label="title"
            variant="standard"

            value={formState.title}
            onChange={onChangeForm}
          />
        </Box>

        <FileInput
          name={"image"}
          onChange={onChangeFileInput}
        />
        <TextField
          id="outlined-multiline-flexible"
          name={"description"}
          multiline
          fullWidth={true}
          minRows={6}
          maxRows={10}

          value={formState.description}
          onChange={onChangeForm}
        />
        <Button
          disabled={btnLauding}
          variant="contained"
          aria-label="Basic button group"
          type={"submit"}
          sx={{
            display: "flex",
            marginTop: 2,
            marginLeft: "auto"
          }}
        >
          Send
        </Button>
      </Grid>
    </form>
  );
};

export default PostForm;