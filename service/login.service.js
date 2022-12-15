const LoginRepository = require("../repository/login.repository");
const { ValidationError } = require('../exceptions/index.exception');
class LoginService {
  loginRepository = new LoginRepository();

  findOneLogin = async (nickname, password) => {

    const user = await this.loginRepository.findOneLogin(nickname);
    
    if (!user || password !== user.password){
       throw new ValidationError('패스워드가 일치하지 않습니다.');
    }

    return user;
  };
}

module.exports = LoginService;
