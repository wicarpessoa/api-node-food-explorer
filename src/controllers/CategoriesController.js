const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class CategoriesController {
   async create(request, response) {
    const { name } = request.body
    await knex("categories").insert({
      name
  })
  response.status(201).json()
   }
   
   async index(request, response) {
      const categories = await knex("categories")

      response.status(201).json(categories)
   }
}

module.exports = CategoriesController