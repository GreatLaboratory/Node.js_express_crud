var express = require('express');
var { User } = require("../models");

var router = express.Router();

// /user 이라는 get방식 url요청으로 users테이블에 있는 모든 행들 json으로 넣어서 응답보내기
router.get('/', async (req, res, next)=>{
  try {
    const users = await User.findAll();
    res.json(users);
  }catch (error) {
    console.error(error);
    next(error);
  }
});

// /user 이라는 post방식 url요청으로 요청의 body에 들어온 id값을 users테이블의 매칭되는 컬럼에다가 넣고 그걸
// json형식으로 create()함수에 넣어서 응답보내기
router.post("/", async (req, res, next)=>{
  try {
    const result = await User.create({
      name : req.body.name,
      age : req. body.age,
      married : req.body.married
    });
    console.log(result);
    res.status(201).json(result);
  }catch (error) {
    console.error(error);
    next(error);
  }
});


// flash-session관련 라우터
router.get("/flash", function (req, res) {
  req.session.message = "세션 메세지";
  req.flash("message", "세션 메세지");
  res.redirect("/users/flash/result");
});
router.get("/flash/result", function (req, res) {
  res.send(`${req.session.message} ${req.flash("message")}`)
});

module.exports = router;