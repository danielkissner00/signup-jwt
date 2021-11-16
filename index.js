require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Route imports
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// connecting to mongoDB
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to mongo");
});

//Middlewares
app.use(express.json());

//Routes
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
