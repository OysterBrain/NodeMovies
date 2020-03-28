"use strict";

const Schmervice = require("schmervice");
const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
module.exports = class AuthService extends Schmervice.Service {
  async login(username, password, requestServices, ctx = {}) {
    const { userService} = requestServices;
    const query  = userService.findUserByUsernamePasswd(username, password);
    const result = await query.execute()
    if(result.length===1){
        const token = jwt.sign({username :  result[0].username }, "123");
        return { token: token };
    }
    else{
        return Boom.forbidden("erreur")
    }
  }
};
