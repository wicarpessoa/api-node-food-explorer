const { Router } = require("express")

const CategoriesController = require("../controllers/CategoriesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const ensureIsAdmin = require("../middlewares/ensureIsAdmin")

const categoriesRoutes = Router()


const categoriesController = new CategoriesController() 


categoriesRoutes.post("/", ensureAuthenticated, ensureIsAdmin, categoriesController.create)
categoriesRoutes.get("/", ensureAuthenticated, categoriesController.index)

module.exports = categoriesRoutes;