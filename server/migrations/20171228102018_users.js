
exports.up = function(knex, Promise) {
  return knex.schema.hasColumn('users', 'active')
    .then(exists => exists ? Promise.resolve() : knex.schema.table('users', table => {
      table.boolean('active').default(true);
    }));
};

exports.down = function(knex, Promise) {
  return knex.schema.hasColumn('users', 'active')
    .then(exists => !exists ? Promise.resolve() : knex.schema.table('users', table => {
      table.dropColumn('active');
    }));
};
