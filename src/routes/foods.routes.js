const { Router } = require("express")
const uploadConfig = require("../configs/upload")
const multer = require("multer")
const FoodsController = require("../controllers/FoodsController");
const FoodAvatarController = require("../controllers/FoodAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");

const foodsRoutes = Router()
const upload = multer(uploadConfig.MULTER)


const foodsController = new FoodsController() 
const foodAvatarController = new FoodAvatarController()

foodsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, foodsController.create);
foodsRoutes.get("/", ensureAuthenticated, foodsController.index);
foodsRoutes.get("/:id", ensureAuthenticated,  foodsController.show);
foodsRoutes.patch("/avatar/:food_id", ensureIsAdmin, ensureAuthenticated, upload.single("img"), foodAvatarController.update);
foodsRoutes.put("/:id", ensureIsAdmin, ensureAuthenticated, upload.single("img"), foodsController.update);

module.exports = foodsRoutes;