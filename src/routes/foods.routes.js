const { Router } = require("express")

const FoodsController = require("../controllers/FoodsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const foodsRoutes = Router()

// function myMiddleware(resquest, response,next) {
//     console.log("myeggs")
//     next()
// }

const foodsController = new FoodsController() 


foodsRoutes.post("/",ensureAuthenticated, foodsController.create);
foodsRoutes.get("/", foodsController.index);

module.exports = foodsRoutes;