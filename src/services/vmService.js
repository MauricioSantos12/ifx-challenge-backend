const { v4: uuidv4 } = require("uuid");
const db = require("../models/data");

async function create(data) {
  const id = uuidv4();
  await db("vms").insert({ id, ...data, isDeleted: false });
  return db("vms").where({ id }).first();
}

function findAll() {
  return db("vms").where({ isDeleted: false });
}

function findById(id) {
  return db("vms").where({ id, isDeleted: false }).first();
}

async function update(id, data) {
  const vm = await findById(id);
  if (!vm) return null;
  await db("vms")
    .where({ id })
    .update({ ...data, updated_at: db.fn.now() });
  return db("vms").where({ id }).first();
}

async function softDelete(id) {
  const vm = await findById(id);
  if (!vm) return null;
  await db("vms")
    .where({ id })
    .update({ isDeleted: true, updated_at: db.fn.now() });
  return true;
}

module.exports = { create, findAll, findById, update, softDelete };
