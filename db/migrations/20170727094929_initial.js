exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('inventory', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.string('image');
      table.decimal('price');
    }),

    knex.schema.createTable('order_history', (table) => {
      table.increments('id').primary();
      table.string('total_price');
      table.string('order_date');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('inventory'),
    knex.schema.dropTable('order_history')
  ])
};
