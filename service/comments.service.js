const CommentRepository = require("../repository/comments.repository");
const { comments } = require("../models");

class CommentService {
  commentRepository = new CommentRepository(comments);

  findAllComment = async (postId) => {
    const existPosts = await this.commentRepository.findAllComment(postId);
    return existPosts;
  };

  createComment = async (postId, userId, nickname, comment) => {
    const excomment = await this.commentRepository.createComment(
      postId,
      userId,
      nickname,
      comment
    );
    return excomment;
  };

  updateComment = async (userId, commentId, comment) => {
    const upcomment = await comments.update(
      { comment },
      { where: { commentId, userId } }
    );
    return upcomment;
  };

  deleteComment = async (commentId, userId) => {
    const del = await this.commentRepository.deleteComment(commentId, userId);

    return del;
  };
}
module.exports = CommentService;
