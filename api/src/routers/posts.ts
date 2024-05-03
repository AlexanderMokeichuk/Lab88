import express from "express";
import auth from "../middleware/auth";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {PostFront} from "../type";
import Post from "../models/Post";
import post from "../models/Post";
import path from "path";


const postsRouter = express.Router();

postsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
  if (!req.file && !req.body.description) {
    return res.status(422).send({error: "One of the image or description fields must be filled in!!"});
  }

  try {
    const postFront: PostFront = {
      user: req.body.user,
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

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await Post
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