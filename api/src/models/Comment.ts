import mongoose, {Schema} from "mongoose";
import {Comment} from "../type";


const CommentSchema = new Schema<Comment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;