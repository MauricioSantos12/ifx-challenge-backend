const vmService = require("../services/vmService");

async function create(req, res, next) {
  try {
    const vm = await vmService.create(req.body);
    res.status(201).json(vm);
  } catch (err) {
    next(err);
  }
}

async function findAll(req, res, next) {
  try {
    res.json(await vmService.findAll());
  } catch (err) {
    next(err);
  }
}

async function findById(req, res, next) {
  try {
    const vm = await vmService.findById(req.params.id);
    if (!vm) return res.status(404).json({ error: "VM no encontrada" });
    res.json(vm);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const vm = await vmService.update(req.params.id, req.body);
    if (!vm)
      return res.status(404).json({ error: "VM no encontrada o eliminada" });
    res.json(vm);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const vm = await vmService.softDelete(req.params.id);
    if (!vm)
      return res.status(404).json({ error: "VM no encontrada o ya eliminada" });
    res.json({ message: "VM eliminada correctamente" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, findAll, findById, update, remove };
