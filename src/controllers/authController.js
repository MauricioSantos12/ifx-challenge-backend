const authService = require("../services/authService");

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    if (!result)
      return res.status(401).json({ error: "Credenciales inválidas" });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60 * 1000,
    });

    res.json({ user: result.user });
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
}

module.exports = { login, logout };
