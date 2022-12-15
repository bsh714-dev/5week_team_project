const { users } = require("../models");

class LoginRepository {
  findOneLogin = async (nickname) => {
    const user = await users.findOne({ where: { nickname } });
    console.log(user);
    return user;
  };
}

module.exports = LoginRepository;
