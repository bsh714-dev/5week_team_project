const PostRepository = require("../../repository/posts.repository.js");

// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPostsModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}; //오류 방지?

let postRepository = new PostRepository(mockPostsModel);

describe("Layered Architecture Pattern Posts Repository Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("Posts Repository findAllPost Method", async () => {
    // findAll Mock의 Return 값을 "findAll String"으로 설정합니다.
    mockPostsModel.findAll = jest.fn(() => {
      return "findAll String";
    }); //가짜 함수 만들기

    const posts = await postRepository.findAllPost(); //레퍼지토리 목업

    expect(postRepository.postsModel.findAll).toHaveBeenCalledTimes(1); //몇번 호출 되었는가

    expect(posts).toBe("findAll String"); //기대값
  });

  test("Posts Repository createPost Method", async () => {
    // create Mock의 Return 값을 "findAll String"으로 설정합니다.
    mockPostsModel.create = jest.fn(() => {
      return "create Return String";
    });

    // createPost Method를 실행하기 위해 필요한 Params 입니다.
    const createPostParams = {
      userId: "createPostuserId",
      nickname: "createPostNickname",
      title: "createPostTitle",
      content: "createPostContent",
    };

    // postRepository의 createPost Method를 실행합니다. 실행할 입력값 설정
    const createPostData = await postRepository.createPost(
      createPostParams.userId,
      createPostParams.nickname,
      createPostParams.title,
      createPostParams.content
    );

    // createPostData는 postsModel의 create를 실행한 결과값을 바로 반환한 값인지 테스트합니다.
    expect(createPostData).toBe("create Return String");

    // postRepository의 createPost Method를 실행했을 때, postsModel의 create를 1번 실행합니다.
    expect(mockPostsModel.create).toHaveBeenCalledTimes(1);

    // postRepository의 createPost Method를 실행했을 때, postsModel의 create를 아래와 같은 값으로 호출합니다.
    expect(mockPostsModel.create).toHaveBeenCalledWith({
      userId: createPostParams.userId,
      nickname: createPostParams.nickname,
      title: createPostParams.title,
      content: createPostParams.content,
    });
  });
});
