import mongoose, { Schema } from 'mongoose';
import { PostFront } from '../type';

const PostSchema = new Schema<PostFront>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
