const express = require("express");
const jsonParser = express.json;
const app = express();
const port = process.env.PORT || 4000;
const authMiddleware = require("./auth/middelware");

const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");

app.use(jsonParser()); // haakjes na parser belangrijk!!
app.use("/images", imageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/images", authMiddleware, imageRouter);

app.listen(port, () => console.log("listening"));
