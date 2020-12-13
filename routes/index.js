const express = require("express");
const app = express();

const authRoutes = require("./auth");
const postRoutes = require("./post");

app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;