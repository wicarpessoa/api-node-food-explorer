const { Router } = require("express")

const FoodsController = require("../controllers/FoodsController")

const foodsRoutes = Router()

// function myMiddleware(resquest, response,next) {
//     console.log("myeggs")
//     next()
// }

const foodsController = new FoodsController() 


foodsRoutes.post("/", foodsController.create)

module.exports = foodsRoutes;