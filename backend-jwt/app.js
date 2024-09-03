import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './src/config/env.js';
import { loginRouter } from './src/routes/routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Coloca este middleware antes de las rutas
app.use(session({
    secret: 'session_secret_key', // Cambia esto por una clave secreta en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usar 'true' si usas HTTPS
}));

// Asegúrate de que este middleware venga después de la configuración de la sesión
app.use(loginRouter);

// Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
