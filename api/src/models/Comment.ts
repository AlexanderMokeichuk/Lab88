import mongoose, {Schema} from "mongoose";
import {CommentFront} from "../type";


const CommentSchema = new Schema<CommentFront>({
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
  date: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;