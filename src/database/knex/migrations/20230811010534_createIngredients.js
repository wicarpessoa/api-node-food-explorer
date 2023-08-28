exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id");
  table.integer("food_id").references("id").inTable("categories").notNullable().onDelete("CASCADE");
  table.text("name").notNullable();
});


exports.down = knex => knex.schema.dropTable("ingredients");
