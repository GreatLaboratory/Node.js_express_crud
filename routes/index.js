var express = require('express');
var { User } = require("../models");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  next("route");  // 이 놈 때문에 아래 두 개의 미들웨어는 실행되지않는다. 다른 같은 주소의 router로 이동한다.
}, function (req, res, next) {
  console.log("실행되지 않는다.");
  next();
}, function (req, res, next) {
  console.log("실행되지 않을까?");
  next();
});

// async, await문법
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render("sequelize", {users})     // sequelize.pug라는 뷰페이지로 렌더링
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
