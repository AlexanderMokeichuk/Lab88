import cors = require("cors");
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import usersRouter from "./routers/users";
import postsRouter from "./routers/posts";
import commentsRouter from "./routers/comments";


const app = express();

const port = 8000;
const localhost = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(express.static("./src/public"));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);


const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server running at ${localhost}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

void run();