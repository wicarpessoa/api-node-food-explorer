const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class FoodsController {
   async create(request, response) {
    const isAdmin =  request.user.isAdmin
    console.log(isAdmin)
    if (!isAdmin) {
      throw new AppError("O usuário não é administrador para criar um prato!")
    }
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
    const { title, description, price, category_id, img_url } = request.body
    const food = knex("foods").where()
   }
   async index(request,response) {
    const {title, id} = request.query
    const foods = await knex("foods").whereLike("title",`%${title}%`)
    response.status(201).json(foods)
   }
}

module.exports = FoodsController