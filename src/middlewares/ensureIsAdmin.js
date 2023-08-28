const {verify} = require("jsonwebtoken");
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureIsAdmin(request,response, next) {
  const authHeader = request.headers.authorization;
  if(!authHeader) {
    throw new AppError("JWT inválido", 401);
  }
  try {
    const [, token] = authHeader.split(" ");
      const {sub} = verify(token, authConfig.jwt.secret);
   
      [, isAdmin] = sub.split(",")
      request.user = {
        isAdmin: Number(isAdmin)
      }
      if(!Number(isAdmin)) {
        throw new AppError("O usuário não é administrador!", 401);
      }
  } catch(e) {
    throw new AppError(e, 401);

  }
    return next()
 }


module.exports = ensureIsAdmin;