var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var flash = require("connect-flash");

// 라우터
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require("./routes/comments");

// DB -> sequelize를 통해 express와 mysql을 연결
var sequelize = require("./models").sequelize;   // 폴더 내의 index.js는 require시 이름을 생략할 수 있음.

var app = express();
sequelize.sync();   // 서버 실행 시 알아서 mysql과 연동

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use는 미들웨어라고 생각하면됨.

// 커스텀 미들웨어
// app.use(function (req, res, next) {
//   console.log(req.url, "저도 미들웨어입니다.");
//   next();
// });

// 기본 디폴트 미들웨어
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // express 높은 버전이라 static미들웨어가 내장되어 있음
app.use(express.json()); // express 높은 버전이라 body-parser미들웨어가 내장되어 있음
app.use(express.urlencoded({ extended: false }));  // express 높은 버전이라 body-parser미들웨어가 내장되어 있음
app.use(cookieParser("secret code"));

// 커스텀 세션 미들웨어
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : "secret code",
  cookie : {
    httpOnly : true,
    secure : false
  }
}));
app.use(flash());

// 라우터 미들웨어_url설정
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
// 위에 있는 라우터 미들웨어에서 해당되는 요청 url이 없을 때 밑에 있는 이 미들웨어로 와서
// 404 에러를 발생시킨 후 해당 에러를 이 아래에 있는 error handler에게 넘긴다. 넘기는게 next()의 기능임
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {    // 위 미들웨어에서 next()로 넘어온 에러가 err인자에 들어온다.
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
