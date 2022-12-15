const PostRepository = require('../../../repository/posts.repository.js');

// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPostsModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

let postRepository = new PostRepository(mockPostsModel);

describe('Layered Architecture Pattern Posts Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('Posts Repository findAllPost Method', async () => {
    mockPostsModel.findAll = jest.fn(() => {
      return 'findAll Result';
    });

    const posts = await postRepository.findAllPost();
    // postsModel에 있는 findAll Method는 1번만 실행된다.
    expect(mockPostsModel.findAll).toHaveBeenCalledTimes(1);

    // postsModel에 있는 findAll Method의 결과값이 바로 Return 되어야 한다.
    expect(posts).toEqual('findAll Result');
  });

  test('Posts Repository createPost Method', async () => {
    mockPostsModel.create = jest.fn(() => {
      return 'Hello Create Result';
    });

    // userId, nickname, title, content
    const createPostsParams = {
      userId: 'createPostUserId',
      nickname: 'createPostNickname',
      title: 'createPostTitle',
      content: 'createPostContent',
    };

    const createPostData = await postRepository.createPost(
      createPostsParams.userId,
      createPostsParams.nickname,
      createPostsParams.title,
      createPostsParams.content
    );

    // postsModel.create Method의 결과값은 createPost (method의 실행한 결과값) 변수와 일치한다.
    expect(createPostData).toEqual('Hello Create Result');

    // postsModel.create Method는 1번 호출된다.
    expect(mockPostsModel.create).toHaveBeenCalledTimes(1);

    // postsModel.create Method를 호출할 때, {userId, nickname, title, content};
    expect(mockPostsModel.create).toHaveBeenCalledWith({
      userId: createPostsParams.userId,
      nickname: createPostsParams.nickname,
      title: createPostsParams.title,
      content: createPostsParams.content,
    });
  });
  test('Posts Repository findPostById Method', async () => {
    mockPostsModel.findByPk = jest.fn(() => {
      return 'findOne Result';
    });
    const post = await postRepository.findPostById();

    // postsModel에 있는 findByPk Method는 1번만 실행된다.
    expect(mockPostsModel.findByPk).toHaveBeenCalledTimes(1);

    // postModel에 있는 findByPk Method의 결과값이 바로 Return 되어야 한다.
    expect(post).toEqual('findOne Result');
  });

  test('Posts Repository updatePost Method', async () => {
    mockPostsModel.update = jest.fn(() => {
      return 'Hello Update Result';
    });

    // postId, title, content
    const updatePostParams = {
      postId: 'updatePostPostId',
      title: 'updatePostTitle',
      content: 'updatePostContent',
    };

    const updatePostData = await postRepository.updatePost(
      updatePostParams.postId,
      updatePostParams.title,
      updatePostParams.content
    );

    // postsModel.update Method의 결과값은 updatePost (method의 실행한 결과값) 변수와 일치한다.
    expect(updatePostData).toEqual('Hello Update Result');

    // postsModel.update Method는 1번 호출된다.
    expect(mockPostsModel.update).toHaveBeenCalledTimes(1);

    // postsModel.update Method를 호출할 때 {postId, title, content};
    expect(mockPostsModel.update).toHaveBeenCalledWith(
      {
        title: updatePostParams.title,
        content: updatePostParams.content,
      },
      { where: { postId: updatePostParams.postId } }
    );
  });

  test('Posts Repository deletePost Method', async () => {
    mockPostsModel.destroy = jest.fn(() => {
      return 'Hello Delete Result';
    });

    const deletePostParams = { postId: 'deletePostPostId' };

    const deletePostData = await postRepository.deletePost(
      deletePostParams.postId
    );

    // postsModel.destroy Method의 결과값은 deletePostData (method의 실행한 결과값) 변수와 일치한다.
    expect(deletePostData).toEqual('Hello Delete Result');

    // postsModel.destroy Method는 1번 호출된다.
    expect(mockPostsModel.destroy).toHaveBeenCalledTimes(1);

    // postsModel.destroy Method를 호출할 때 {postId}
    expect(mockPostsModel.destroy).toHaveBeenCalledWith({
      where: { postId: deletePostParams.postId },
    });
  });
});
