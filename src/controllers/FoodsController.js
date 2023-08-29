const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class FoodsController {
   async create(request, response) {
    const { title, description, price, category_id, ingredients} = request.body

    const checkCategoryId = await knex("categories").where({id:category_id}).first()
    const checkFoodName = await knex("foods").where({title: title}).first()
    if (!checkCategoryId) {
      throw new AppError("Categoria não encontrada!")
    }
    if (checkFoodName) {
      throw new AppError("O prato já existe, atualize o prato!")
    }
    const food_id = await knex("foods").insert({
      title,
      description,
      price,
      category_id
  })  
  const ingredientsInsert = ingredients.map((ingredient) => {
    return {
      food_id: food_id[0] ,
      name:ingredient,
    };
  });
  await knex("ingredients").insert(
    ingredientsInsert
  )
  response.status(201).json(food_id)
   } 

   async update(request,response) {
    try {
      const { title, description, price, category_id, ingredients } = request.body
    const { id } = request.params;

    const food = await knex("foods").where({id}).first();


    food.title = title ?? food.title;
    food.description = description ?? food.description;
    food.category_id = category_id ?? food.category_id;
    food.price = price ?? food.price;

    await knex("foods").where({id}).update(food)
    if (ingredients) {
      await knex("ingredients").where({"food_id": id}).del()
      const ingredientsInsert = ingredients.map((ingredient) => {
        return {
          food_id: food.id,
          name: ingredient,
        };
      });

      await knex("ingredients").insert(
        ingredientsInsert
      )
      response.status(200).json(food)

    } 
    } catch(e) {
      console.log(e)
    }
    
   }

   async index(request,response) {
    try {
      const { title } = request.query;

      const distinctFoodIds = await knex("ingredients")
      .distinct("food_id")
      .whereLike("name", `%${title}%`);

    const foodIds = distinctFoodIds.map(item => item.food_id);

    const foodsByCategory = await knex("foods")
      .select("foods.category_id", "categories.name")
      .select(knex.raw("JSON_GROUP_ARRAY(JSON_OBJECT('id', foods.id, 'title', foods.title, 'description', foods.description, 'price', foods.price, 'img_url', foods.img_url)) AS foods"))
      .leftJoin("categories", "foods.category_id", "categories.id")
      .whereIn("foods.id", function() {
        this.select("foods.id")
          .from("foods")
          .leftJoin("ingredients", "foods.id", "ingredients.food_id")
          .whereIn("foods.id", foodIds)
          .orWhereLike("foods.title", `%${title}%`)
          .groupBy("foods.id");
      })
      .groupBy("foods.category_id", "categories.name");

       const formattedResult = foodsByCategory.map(item => ({
         category_id: item.category_id,
         category_name: item.name,
         foods: JSON.parse(item.foods)
       }));
      
      response.status(201).json(formattedResult)
    } catch(e) {
      alert(e)
    }
   }

   async show(request,response) {
    const { id } = request.params
    try {
      const food = await knex("foods").where({id}).first()
      if (!food) {
        throw new AppError("O prato não existe")
      }
      const ingredients = await knex("ingredients").where({food_id:food.id})
      if (ingredients) {
        response.status(201).json({...food,ingredients})
      } else {
        response.status(201).json(food)
      }
     }catch(error) {
      response.status(404).json(error)
    } 
    }

    async delete(request, response) {
      const { id } = request.params
      try {
        const food = await knex("foods").where({id}).del()
        console.log(food)
        if (!food) {
          throw new AppError("Não foi possivel excluir o prato!")
        }
        
          response.status(201).json(food)
        } catch(error) {
        response.status(404).json(error)
      } 
    }

}

module.exports = FoodsController