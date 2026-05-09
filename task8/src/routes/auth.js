import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // <-- Importamos la nueva librería
import { get_db } from '../db.js';

const router = express.Router();

// Helper: Buscar usuario por email en la base de datos
function get_user_by_email(db, email) {
    return new Promise((resolve, reject) => {
        db.get("SELECT id, email, password_hash FROM users WHERE email = ?", [email], (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
}

// POST /auth/signup - Registrar un nuevo usuario (El que ya teníamos)
router.post('/signup', async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    try {
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        const db = get_db();
        
        db.run("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, password_hash], function(err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(409).json({ error: "Email already exists" });
                }
                return res.status(500).json({ error: `Database error: ${err.message}` });
            }
            return res.status(201).json({ id: this.lastID, email: email });
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// POST /auth/login - Iniciar sesión (NUEVO)
router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const db = get_db();
        
        // 1. Buscar al usuario por su email
        const user = await get_user_by_email(db, email);
        if (!user) {
            // Si no existe el usuario, devolvemos 401 Unauthorized
            return res.status(401).json({ error: "Invalid credentials" }); 
        }

        // 2. Comparar la contraseña que nos envían con el hash guardado en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            // Si la contraseña no coincide, devolvemos 401 Unauthorized
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // 3. Crear el Token JWT (La pulsera VIP)
        // Normalmente esto va en el archivo .env, pero usamos un valor por defecto para que funcione ahora
        const secret = process.env.JWT_SECRET || "mi_secreto_super_seguro"; 
        const token = jwt.sign(
            { sub: user.id }, // El "sub" (subject) guarda la ID del usuario dentro del token
            secret, 
            { expiresIn: '1h' } // El token caducará en 1 hora
        );

        // 4. Devolver el token al usuario
        return res.status(200).json({ token: token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
// Middleware de Autenticación (El guardia de seguridad)
export const requireAuth = (req, res, next) => {
    // 1. Leer la cabecera (Header) de Autorización
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    // 2. Extraer solo el token (quitamos la palabra "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verificar que el token sea válido y no esté caducado
        const secret = process.env.JWT_SECRET || "mi_secreto_super_seguro";
        const decoded = jwt.verify(token, secret);

        // 4. Si es válido, guardamos los datos del usuario en la petición (req)
        req.user = {
            id: decoded.sub // 'sub' es donde guardamos el ID en el paso anterior
        };

        // 5. ¡Dejar pasar a la ruta!
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
export default router;