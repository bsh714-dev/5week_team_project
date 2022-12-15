const PostRepository = require("../repository/posts.repository");
const { posts } = require("../models");

class PostService {
  postRepository = new PostRepository(posts);

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  createPost = async (userId, nickname, title, content) => {
    console.log(userId, nickname);
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content
    );

    return {
      userId: createPostData.userId,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  updatePost = async (postId, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.updatePost(postId, title, content);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  deletePost = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.deletePost(postId);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };
}

module.exports = PostService;
