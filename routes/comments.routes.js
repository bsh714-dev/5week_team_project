const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const CommentsController = require("../controller/comments.controller");
const commentsController = new CommentsController();

// 댓글 생성
router.post("/:postId", authMiddleware, commentsController.createComment);
// 댓글 수정
router.put("/:commentId", authMiddleware, commentsController.updateComment);
// 댓글 삭제
router.delete("/:commentId", authMiddleware, commentsController.deleteComment);
// 댓글 조회
router.get("/:postId", commentsController.getComment);

module.exports = router;
