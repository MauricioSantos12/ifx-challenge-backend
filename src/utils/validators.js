const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const createVmSchema = z.object({
  name: z.string().min(1),
  cores: z.number().int().positive(),
  ram: z.number().positive(),
  disk: z.number().positive(),
  os: z.string().min(1),
  status: z.enum(["Encendida", "Apagada"]),
});

const updateVmSchema = createVmSchema.partial();

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['Admin', 'Cliente']),
});

const updateUserSchema = createUserSchema.partial();

module.exports = { loginSchema, createVmSchema, updateVmSchema, createUserSchema, updateUserSchema };
