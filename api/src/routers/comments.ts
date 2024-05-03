import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import { CommentFront, Comments } from '../type';
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user!;

  try {
    const commentFront: CommentFront = {
      user: user._id,
      post: req.body.post,
      date: new Date().toISOString(),
      text: req.body.text,
    };

    const comment = new Comment(commentFront);
    await comment.save();

    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next();
  }
});

commentsRouter.get('/', async (_req, res, next) => {
  try {
    const comments: Comments[] = await Comment.find()
      .populate({
        path: 'user',
        select: 'username -_id',
      })
      .exec();

    return res.send(comments);
  } catch (e) {
    next(e);
  }
});
export default commentsRouter;
