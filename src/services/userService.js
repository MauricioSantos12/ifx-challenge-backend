const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('../models/data');

async function create(data) {
  const id = crypto.randomUUID();
  const password = bcrypt.hashSync(data.password, 10);
  await db('users').insert({ id, ...data, password });
  return db('users').where({ id }).select('id', 'email', 'role', 'created_at', 'updated_at').first();
}

function findAll() {
  return db('users').select('id', 'email', 'role', 'created_at', 'updated_at');
}

function findById(id) {
  return db('users').where({ id }).select('id', 'email', 'role', 'created_at', 'updated_at').first();
}

async function update(id, data) {
  const user = await findById(id);
  if (!user) return null;
  if (data.password) data.password = bcrypt.hashSync(data.password, 10);
  await db('users').where({ id }).update({ ...data, updated_at: db.fn.now() });
  return findById(id);
}

async function remove(id) {
  const user = await findById(id);
  if (!user) return null;
  await db('users').where({ id }).del();
  return true;
}

module.exports = { create, findAll, findById, update, remove };
