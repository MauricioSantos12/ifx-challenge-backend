const crypto = require("crypto");
const db = require("../models/data");

let io;

function setIo(ioInstance) {
  io = ioInstance;
}

function emit(event, payload) {
  if (io) io.emit(event, payload);
}

async function create(data) {
  const id = crypto.randomUUID();
  await db("vms").insert({ id, ...data, isDeleted: false });
  const vm = await db("vms").where({ id }).first();
  emit("vm:created", vm);
  return vm;
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
  const updated = await db("vms").where({ id }).first();
  emit("vm:updated", updated);
  return updated;
}

async function softDelete(id) {
  const vm = await findById(id);
  if (!vm) return null;
  await db("vms")
    .where({ id })
    .update({ isDeleted: true, updated_at: db.fn.now() });
  emit("vm:deleted", { id });
  return true;
}

module.exports = { create, findAll, findById, update, softDelete, setIo };
