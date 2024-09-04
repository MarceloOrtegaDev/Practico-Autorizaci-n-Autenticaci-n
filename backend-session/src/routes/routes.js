import { Router } from "express";
import { login, session, logout, register } from "../controllers/controllers.js";
export const sessionRoutes = Router()

sessionRoutes.post('/login', login );

sessionRoutes.post('/register', register );

// Ruta para obtener los datos de la sesión
sessionRoutes.get('/session', session );

// Ruta para cerrar la sesión
sessionRoutes.post('/logout', logout );