import {Model} from "mongoose";
import Types = module;

export interface UserFront {
  username: string,
  password: string,
  token: string,
}

export interface UserApi extends UserFront {
  _id: Types.ObjectId,
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>,
  generateToken(): void,
}

export type UserModel = Model<UserFront, unknown, UserMethods>;

export interface Post {
  title: string,
  description: string,
  image: string,
  date: string,
}

export interface Comment {
  user: Types.ObjectId,
  post: Types.ObjectId,
  text: string,
}