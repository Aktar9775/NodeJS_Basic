const express = require('express');
const PORT = 8001;
const { connectMongoose } = require("./connection");
const { logReqRes } = require('./middlewares'); // index by default

connectMongoose("mongodb://127.0.0.1:27017/Tested_DB").then(() => {
  console.log("MongoDB Connected");
});

const userRouter = require('./routes/user');
const app = express();

app.use(express.json()); // ✅ Add this to parse JSON requests
app.use(express.urlencoded({ extended: false })); // For form-encoded data
app.use(logReqRes('./log.txt'));

app.use('/api/UserData', userRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
