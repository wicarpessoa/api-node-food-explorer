
exports.up = knex => knex.schema.createTable("foods", table => {
  table.increments("id");
  table.text("title").notNullable();
  table.text("description").notNullable();
  table.integer("price").notNullable();
  table.text("img_url").nullable();
  table.integer("category_id").references("id").inTable("categories").notNullable().onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("foods");
