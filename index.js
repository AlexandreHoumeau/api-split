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
app.use('/', function(req, res, next) {
  // do your filtering here, call a `res` method if you want to stop progress or call `next` to proceed
  var ip = req.ip || 
           req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           req.connection.socket.remoteAddress;

   // Your allowed ip. You can also check against an array
   if (ip == process.env.IP_ADDRESS) {
     next();
   } else {
      res.end();
   }
})

//Routes Middleware
// app.use("/api/user", authRoutes);
// app.use("/api/post", postRoutes);
app.use("/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening to port ${port}`);
});

module.exports = app
