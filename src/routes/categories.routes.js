const { Router } = require("express")

const CategoriesController = require("../controllers/CategoriesController")

const categoriesRoutes = Router()

// function myMiddleware(resquest, response,next) {
//     console.log("myeggs")
//     next()
// }

const categoriesController = new CategoriesController() 


categoriesRoutes.post("/", categoriesController.create)

module.exports = categoriesRoutes;