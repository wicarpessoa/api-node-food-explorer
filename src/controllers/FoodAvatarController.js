const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")
class FoodAvatarController {
  async update(request,response) {
    const {food_id} = request.params
    const foodImgFilename = request.file.filename
    console.log(foodImgFilename)
    console.log(food_id)
    const diskStorage = new DiskStorage()

    const food = await knex("foods").where({id: food_id}).first()
    if(!food) {
      throw new AppError("A comida não existe", 401)
    }
    if(food.img_url) {
      await diskStorage.deleteFile(food.img_url)
    }

    const filename = await diskStorage.saveFile(foodImgFilename)
    food.img_url = filename

    await knex("foods").update(food).where({id: food_id});
    return response.json(food)
  }
}

module.exports = FoodAvatarController