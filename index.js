const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const env = require('dotenv');
const app = express();
const port = 3000;

env.config();
//connect to dataBase
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connect to database");
  }
);


//Import Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

//Middlewares 
app.use(bodyParser.json())

//Routes Middleware
app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);
app.listen(port, () => {
  console.log("Server is listening to port 3000");
});
