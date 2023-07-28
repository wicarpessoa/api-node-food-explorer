exports.up = knex => knex.schema.createTable("order_items", table => {
  table.increments("id");
  table.integer("food_id").references("id").inTable("foods").notNullable();
  table.integer("order_id").references("id").inTable("orders").notNullable();
  table.integer("quantity").notNullable();
});


exports.down = knex => knex.schema.dropTable("order_items");

