const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const env = require('dotenv');
const app = express();
const port = process.env.PORT ||  3000;
const routes =require('./routes/index')
env.config();
//connect to dataBase
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connect to database");
  }
);

//Import Routes
// const authRoutes = require("./routes/auth");
// const postRoutes = require("./routes/post");

//Middlewares 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//Routes Middleware
// app.use("/api/user", authRoutes);
// app.use("/api/post", postRoutes);
app.use("/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening to port ${port}`);
});

module.exports = app
