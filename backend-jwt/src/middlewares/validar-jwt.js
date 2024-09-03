import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env.js';
import { newConnection } from '../db/database.js';

// Middleware para verificar el token JWT
export async function verificarJwt(req, res, next) {
  const token = req.cookies.authToken || req.session.token;
  const conexion = await newConnection();

  if (!token) {
    await conexion.end();
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Se busca al usuario en la base de datos
    const [usuario] = await conexion.query(
      "SELECT * FROM users WHERE id = ?",
      [decoded.userId]
    );
    await conexion.end();

    const user = usuario[0];

    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user; // Agrega la información del usuario decodificada al request
    next();
  } catch (error) {
    await conexion.end();
    return res.status(500).json({ message: 'Error Inesperado' });
  }
};