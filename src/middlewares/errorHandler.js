// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Error interno del servidor" });
}

module.exports = errorHandler;
