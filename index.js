const express = require("express");
const jsonParser = express.json;
const app = express();
const port = process.env.PORT || 4000;

const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

app.use(jsonParser()); // haakjes na parser belangrijk!!
app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log("listening"));
