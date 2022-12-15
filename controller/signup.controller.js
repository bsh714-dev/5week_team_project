const { InvalidParamsError } = require('../exceptions/index.exception');
const SignUpService = require('../service/singup.service');

// Signup의 컨트롤러(Controller)역할을 하는 클래스
class SignUpController {
  constructor() {
    this.signUpService = new SignUpService();
  }
  signUp = async (req, res) => {
    try {
      const { nickname, password, confirm } = req.body;
      if (password !== confirm) {
        throw new InvalidParamsError();
      }
      const user = await this.signUpService.createUser({
        nickname,
        password,
      });
      res.status(201).json({ result: user });
    } catch (error) {
      console.error(error);
      res.status(error.status || 400);
      res.json({ errorMessage: error.message });
    }
  };
}

module.exports = SignUpController;
