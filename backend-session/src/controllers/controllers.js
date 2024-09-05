import { newConnection } from "../db/database.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    const conexion = await newConnection()
    const [user] = await conexion.query("Select * from users where username = ? AND password = ?", [username, password]);
    const usuario = user[0]
    
    if (usuario) {
        // Guardar información del usuario en la sesión
        req.session.userId = usuario.id;
        req.session.username = usuario.username;
        
        return res.json({ 
            message: 'Inicio de sesión exitoso', 
            user: { id: user.id, username: user.username } });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
}

export const register = async (req, res) => {

    const { username, password } = req.body;
    const conexion = await newConnection()
    const [usuarioRegistrado] = await conexion.query("Select * from users where username = ?", username)
    if (usuarioRegistrado.length > 0) {
        return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const [user] = await conexion.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password]);

    if (user) {
        res.json({msg: "Usuario registrado correctamente"})
    } else {
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }
}

export const session = (req, res) => {
    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
}

export const logout = (req, res) => {
    console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
}