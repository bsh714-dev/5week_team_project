class PostRepository {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }
  findAllPost = async () => {
    const Posts = await this.postsModel.findAll();
    return Posts;
  };

  findPostById = async (postId) => {
    const Post = await this.postsModel.findByPk(postId);

    return Post;
  };

  createPost = async (userId, nickname, title, content) => {
    const createPostData = await this.postsModel.create({
      userId,
      nickname,
      title,
      content,
    });

    return createPostData;
  };

  updatePost = async (postId, title, content) => {
    const updatePostData = await this.postsModel.update(
      { title, content },
      { where: { postId } }
    );

    return updatePostData;
  };

  deletePost = async (postId) => {
    const deletePostData = await this.postsModel.destroy({ where: { postId } });

    return deletePostData;
  };
}

module.exports = PostRepository;
