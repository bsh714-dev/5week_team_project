class CommentRepository {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }
  findAllComment = async () => {
    const Posts = await this.commentsModel.findAll();
    return Posts;
  };

  findCommentById = async (commentId) => {
    const Comment = await this.commentsModel.findByPk(commentId);

    return Comment;
  };

  createComment = async (postId, userId, nickname, comment) => {
    const createPostData = await this.commentsModel.create({
      postId,
      userId,
      nickname,
      comment,
    });

    return createPostData;
  };

  updateComment = async (postId, title, content) => {
    const updatePostData = await this.commentsModel.update(
      { comment },
      { where: { commentId, userId } }
    );
    return updatePostData;
  };

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await this.commentsModel.destroy({
      where: {
        commentId,
        userId,
      },
    });

    return deleteCommentData;
  };
}

module.exports = CommentRepository;
