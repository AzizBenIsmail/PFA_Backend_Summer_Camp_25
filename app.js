var createError = require("http-errors");
var express = require("express");
//import express from 'express';
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const http = require("http"); //1 import web "http"

const { connectToMongoDB } = require("./db/db");

var indexRouter = require("./routes/index");
//import indexRouter from './routes/index';

var usersRouter = require("./routes/usersRouter");
var osRouter = require("./routes/osRouter");
var carRouter = require("./routes/carRouter");

require("dotenv").config(); // configuration .env

var app = express(); //Bdina

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //

app.use("/", indexRouter);
app.use("/users", usersRouter)
app.use("/os", osRouter);
app.use("/cars", carRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

//1** => information 
//2** => Succ
//3** => redirection
//4** => erreur client
//5** => err cote server


const server = http.createServer(app);
server.listen(process.env.Port, () => {
  connectToMongoDB(),
  console.log("app is running on port 5000");
});
