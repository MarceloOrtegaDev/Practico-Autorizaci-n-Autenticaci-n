import { Router } from "express";
import { login, logout,session, register } from "../controllers/controller.js";
import { verificarJwt } from "../middlewares/validar-jwt.js";
export const loginRouter = Router();

loginRouter.post('/login', login );

// Endpoint para validar la sesión
loginRouter.get('/session', verificarJwt , session );

// Endpoint de cierre de sesión (logout)
loginRouter.post('/logout', logout);

loginRouter.post('/register', register)
