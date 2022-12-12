const { posts } = require("../models");

class PostRepository {
  findAllPost = async () => {
    const Posts = await posts.findAll();
    return Posts;
  };

  findPostById = async (postId) => {
    const Post = await posts.findByPk(postId);

    return Post;
  };

  createPost = async (userId, nickname, title, content) => {
    const createPostData = await posts.create({
      userId,
      nickname,
      title,
      content,
    });

    return createPostData;
  };

  updatePost = async (postId, title, content) => {
    const updatePostData = await posts.update(
      { title, content },
      { where: { postId } }
    );

    return updatePostData;
  };

  deletePost = async (postId) => {
    const updatePostData = await posts.destroy({ where: { postId } });

    return updatePostData;
  };
}

module.exports = PostRepository;
