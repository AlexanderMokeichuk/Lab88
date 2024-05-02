import mongoose, {Schema} from "mongoose";
import {Post} from "../type";

const PostSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  date: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;