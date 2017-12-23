
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', table => {
      table.increments();
      table.string('google_id').notNullable().unique();
      table.string('name').notNullable();
    }),
    knex.schema.createTableIfNotExists('messages', table => {
      table.integer('from').notNullable().references('users.id');
      table.integer('to').references('users.id');
      table.string('content').notNullable();
      table.timestamp('date').defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('messages'),
    knex.schema.dropTableIfExists('users'),
  ]);
};
