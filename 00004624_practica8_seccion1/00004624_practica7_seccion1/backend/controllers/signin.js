import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from '../data/connection.js';
import { JWT_SECRET } from '../../keys/keys.js';


export const SignIn = async (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = $1', [email], async (error, results) => {
        if (error) {
            throw error;
        }
        const resultFinds = results.rows;
        if (resultFinds.length === 0) {
            return res.status(400).json({ message: "Invalid user found" });
        }
        const userFinds = resultFinds[0];  // ← Agregué [0] para obtener el primer usuario

        const isPasswordValid = await bcrypt.compare(password, userFinds.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const _jwt = jwt.sign({ id: userFinds.id }, JWT_SECRET, { expiresIn: "8h" });
        return res.status(200).json({ success: true, message: 'user finded', _jwt, userFinds });
    });
};