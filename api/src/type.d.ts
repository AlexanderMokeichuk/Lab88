import { Model } from 'mongoose';
import Types = module;

export interface PostFront {
  user: Types.ObjectId;
  title: string;
  description: string | null;
  image: string | null;
  date: string;
}

export interface CommentFront {
  user: Types.ObjectId;
  post: Types.ObjectId;
  text: string;
  date: string;
}

export interface Posts extends PostFront<Omit<'user'>> {
  _id: Types.ObjectId;
  user: {
    username: string;
  };
}

export interface Comments extends CommentFront<Omit<'user'>> {
  _id: Types.ObjectId;
  user: {
    username: string;
  };
}

export interface UserFront {
  username: string;
  password: string;
  token: string;
}

export interface UserApi extends UserFront {
  _id: Types.ObjectId;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFront, unknown, UserMethods>;
