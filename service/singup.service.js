const SignUpRepository = require('../repository/signup.repository');
const { ValidationError } = require('../exceptions/index.exception');
const { users } = require('../models');

class SignUpService {
  constructor() {
    this.signUpRepository = new SignUpRepository(users);
  }

  findUser = async ({ nickname }) => {
    const user = await this.signUpRepository.findUser({
      nickname,
    });
    return user;
  };

  createUser = async ({ nickname, password }) => {
    const isExistUser = await this.findUser({ nickname });

    if (isExistUser) {
      throw new ValidationError('동일한 닉네임을 가진 User가 이미 존재합니다.');
    }
    const user = await this.signUpRepository.createUser({
      nickname,
      password,
    });
    return user;
  };
}

module.exports = SignUpService;
