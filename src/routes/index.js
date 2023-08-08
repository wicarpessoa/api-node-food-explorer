const {Router} = require("express")

const usersRouter = require("./users.routes")
const foodsRouter = require("./foods.routes")
const categoriesRouter = require("./categories.routes")
const ordersRouter = require("./orders.routes")
const sessionsRouter = require("./sessions.routes")
const routes = Router();

routes.use("/users", usersRouter);
routes.use("/foods", foodsRouter);
routes.use("/categories", categoriesRouter);
routes.use("/orders", ordersRouter);
routes.use("/sessions", sessionsRouter);
module.exports = routes;