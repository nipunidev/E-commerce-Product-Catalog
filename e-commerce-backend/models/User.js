const pool = require('../config/db');

class User {
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ username, email, password, role = 'user' }) {
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role]
        );
        return { id: result.insertId, username, email, role };
    }
}

module.exports = User;