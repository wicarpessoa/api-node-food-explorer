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
}

module.exports = CategoriesController