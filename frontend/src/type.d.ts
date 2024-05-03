export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  massage: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Post {
  title: string;
  description: string | null;
  image: File | null;
}

export interface PostApi {
  _id: string;
  title: string;
  description: string,
  date: string;
  user: {
    username: string;
  };
  image: string | null,
}

export interface Comment {
  text: string,
  post: string,
}

export interface CommentApi {
  _id: string,
  user: {
    username: string
  },
  text: string,
  date: string,
}
