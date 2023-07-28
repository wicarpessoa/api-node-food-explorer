const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class FoodsController {
   async create(request, response) {
    const { title, description, price, category_id, img_url} = request.body
    const checkCategoryId = await knex("categories").where({id:category_id}).first()
    if (!checkCategoryId) {
      throw new AppError("Categoria não encontrada!")
    }
    await knex("foods").insert({
      title,
      description,
      price,
      category_id,
      img_url
  })
  response.status(201).json()
   } 
   async update(request,response) {

   }
}

module.exports = FoodsController