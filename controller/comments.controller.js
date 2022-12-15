const CommentService = require("../service/comments.service");

class CommentController {
  CommentService = new CommentService();

  //댓글 생성
  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, nickname } = res.locals.user;
      const { comment } = req.body;
      if (comment === "") {
        throw new InvalidParamsError();
      }
      await this.CommentService.createComment(
        postId,
        userId,
        nickname,
        comment
      );
      res.status(200).json({ message: "댓글을 작성하였습니다." });
    } catch (error) {
      console.log(error);
      res.status(400).send({ errorMessage: "댓글 작성에 실패하였습니다." });
    }
  };

  //댓글 조회
  getComment = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const existPosts = await this.CommentService.findAllComment(postId);

      if (existPosts.length) {
        res.status(200).json({ existPosts });
      } else {
        return res
          .status(400)
          .json({ errorMessage: "댓글이 존재하지 않습니다." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "댓글 목록 조회에 실패하였습니다." });
    }
  };

  //게시글 수정
  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const { userId } = res.locals.user;
    await this.CommentService.updateComment(userId, commentId, comment);

    res.status(201).json({ message: "댓글을 수정하였습니다." });
  };

  //게시글 삭제
  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    await this.CommentService.deleteComment(commentId, userId);

    res.json({ message: "댓글을 삭제하였습니다." });
  };
}

module.exports = CommentController;
