const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.seed = async function (knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      id: crypto.randomUUID(),
      email: 'admin@ifx.com',
      password: bcrypt.hashSync('Admin123!', 10),
      role: 'Admin',
    },
    {
      id: crypto.randomUUID(),
      email: 'cliente@ifx.com',
      password: bcrypt.hashSync('Cliente123!', 10),
      role: 'Cliente',
    },
  ]);
};
