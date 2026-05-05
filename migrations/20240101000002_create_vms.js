exports.up = function (knex) {
  return knex.schema.createTable('vms', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.integer('cores').unsigned().notNullable();
    table.float('ram').unsigned().notNullable();
    table.float('disk').unsigned().notNullable();
    table.string('os').notNullable();
    table.enum('status', ['Encendida', 'Apagada']).notNullable().defaultTo('Apagada');
    table.boolean('isDeleted').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('vms');
};
