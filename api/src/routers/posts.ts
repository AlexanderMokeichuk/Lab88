import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {PostFront, Posts} from "../type";
import Post from "../models/Post";


const postsRouter = express.Router();

postsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
  const user = (req as RequestWithUser).user!;

  if (!req.file && !req.body.description) {
    return res.status(422).send({error: "One of the image or description fields must be filled in!!"});
  }

  try {
    const postFront: PostFront = {
      user: user._id,
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      description: req.body.description || null,
      date: new Date().toISOString(),
    };

    const post = new Post(postFront);
    await post.save();

    return res.send(post);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

postsRouter.get("/", async (_req, res, next) => {
  try {
    const posts: Posts[] = await Post
      .find()
      .sort({date: -1})
      .populate({
        path: "user",
        select: 'username -_id',
      }).exec();

    return res.send(posts);
  } catch (e) {
    next(e);
  }
});

export default postsRouter;