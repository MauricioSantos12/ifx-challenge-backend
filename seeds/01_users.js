const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.seed = async function (knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      id: uuidv4(),
      email: 'admin@ifx.com',
      password: bcrypt.hashSync('Admin123!', 10),
      role: 'Admin',
    },
    {
      id: uuidv4(),
      email: 'cliente@ifx.com',
      password: bcrypt.hashSync('Cliente123!', 10),
      role: 'Cliente',
    },
  ]);
};
