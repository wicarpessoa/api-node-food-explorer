const {verify} = require("jsonwebtoken");
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request,response, next) {
  const authHeader = request.headers.authorization;
  console.log(authHeader)
  if(!authHeader) {
    throw new AppError("JWT inválido", 401);
  }
  try {
    const [, token] = authHeader.split(" ");
      const {sub} = verify(token, authConfig.jwt.secret);
   
      [user_id, isAdmin] = sub.split(",")
      request.user = {
        id: Number(user_id),
        isAdmin: Number(isAdmin)
      }
  } catch {
    throw new AppError("JWT inválido", 401);

  }
    return next()
 }


module.exports = ensureAuthenticated;