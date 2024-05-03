import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, sipping drop..`);
  }
};

const collections = ['comments', 'posts', 'users'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [userOne, userTwo] = await User.create(
    {
      username: 'Alex',
      password: '1234',
      token: crypto.randomUUID(),
    },
    {
      username: 'Alex2',
      password: '1234',
      token: crypto.randomUUID(),
    },
  );

  const [postOne, postTwo] = await Post.create(
    {
      title: 'TestPost1',
      description: 'азазазазазаза',
      user: userOne,
      date: new Date().toISOString(),
    },
    {
      title: 'TestPost2',
      description: 'ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ',
      user: userTwo,
      date: new Date().toISOString(),
    },
  );

  await Comment.create(
    {
      user: userTwo,
      post: postOne,
      text: 'Test comment for post One',
      date: new Date().toISOString(),
    },
    {
      user: userOne,
      post: postTwo,
      text: 'Test comment for post Two',
      date: new Date().toISOString(),
    },
  );

  await db.close();
};

void run();
