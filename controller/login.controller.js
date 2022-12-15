const LoginService = require("../service/login.service");
const jwt = require("jsonwebtoken"); //jwt 사용
// 로그인 컨트롤러
class LoginController {
  constructor() {
    this.loginService = new LoginService();
  }

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      if (req.headers.authorization) {
        res.status(400).send("로그인이 이미 되어있습니다");
        return;
      }
      const user = await this.loginService.findOneLogin(nickname, password);

      const accessToken = createAccessToken(user.userId);
      res.cookie("accessToken", accessToken); // Access Token을 Cookie에 전달한다.
      return res
        .status(200)
        .send({ message: "Token이 정상적으로 발급되었습니다." });
    } catch (error) {
      console.error(error);
      res.status(error.status || 400);
      res.json({ errorMessage: error.message });
    }
  };
}

// Access Token을 생성합니다.
function createAccessToken(userId) {
  const accessToken = jwt.sign(
    { userId: userId }, // JWT 데이터
    "JMT_SECRET", // 비밀키
    { expiresIn: "60m" }
  );

  return accessToken;
}
module.exports = LoginController;
