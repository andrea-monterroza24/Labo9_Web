import jwt from "jsonwebtoken";
import { db } from '../data/connection.js';
import { generateHash } from '../hashes/index.js';
import { JWT_SECRET } from '../../keys/keys.js';

export const SignUp = async (req, res) => {
    const { name, email, password } = req.body;
    const hashGenerated = await generateHash(password);

    db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashGenerated],
        (error, results) => {
            if (error) {
                throw error;
            }
            const userFinds = results.rows[0];
            const _jwt = jwt.sign({ id: userFinds.id }, JWT_SECRET, { expiresIn: "8h" });
            
            return res.status(201).json({ 
                success: true, 
                message: `User added with ID: ${userFinds.id}`, 
                _jwt, 
                userFinds  
            });
        });
};