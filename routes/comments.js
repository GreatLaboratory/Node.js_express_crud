var express = require("express");
var {User, Comment} = require("../models");

var router = express.Router();

// /comments/1 처럼 url파라미터에 아이디값 받아서 해당 댓글 json으로 응답보내기
router.get("/:id", async (req, res, next)=> {
    try {
        const comments = await Comment.findAll({
            include : {   // models에서 hasMany나 belongsTo같은 연결해두어야 include사용가능
                model : User,
                where : {id : req.params.id}   // 사용자 아이디가 1인 모든 댓글들 불러오기
            }
        });
        console.log(comments);
        res.json(comments);
    }catch (error) {
        console.error(error);
        next(error);
    }
});

// 클라이언트의 요청을 sequelize를 통해 js->db로 저장 후 저장내용 json으로 클라이언트에게 응답보내기
// 사용자 아이디와 댓글내용 두가지를 클라이언트부터 요청받아와서 댓글 등록
router.post("/", async (req, res, next)=>{
    try {
        const result = await Comment.create({
            commenter : req.body.id,
            comment : req.body.comment
        });
        console.log(result);
        res.status(201).json(result);
    }catch (error) {
        console.error(error);
        next(error);
    }
});

// 해당 id의 댓글 수정
router.patch("/:id", async (req, res, next)=> {
    try {
        const result = await Comment.update({ comment : req.body.comment }, { where : { id : req.params.id } });
        res.json(result);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

// 해당 id의 댓글 삭제
router.delete("/:id", async (req, res, next)=>{
    try {
        const result = await Comment.destroy({ where : { id : req.params.id }});
        res.json(result);
    }catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;