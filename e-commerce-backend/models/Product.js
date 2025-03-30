const pool = require('../config/db');

class Product {
    static async findAll({ category, search, sortBy, sortOrder = 'ASC', limit = 10, offset = 0 }) {
        let query = 'SELECT * FROM products';
        const params = [];

        const conditions = [];
        if (category) {
            conditions.push('category = ?');
            params.push(category);
        }
        if (search) {
            conditions.push('(name LIKE ? OR description LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }

        if (conditions.length) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        if (sortBy === 'RAND()') {
            query += ' ORDER BY RAND()';
        } else if (sortBy) {
            query += ` ORDER BY ${sortBy} ${sortOrder}`;
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(Number(limit), Number(offset));

        const [rows] = await pool.query(query, params);
        return rows;
    }

    static async count({ category, search }) {
        let query = 'SELECT COUNT(*) as total FROM products';
        const params = [];

        const conditions = [];
        if (category) {
            conditions.push('category = ?');
            params.push(category);
        }
        if (search) {
            conditions.push('(name LIKE ? OR description LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }

        if (conditions.length) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await pool.query(query, params);
        return rows[0].total;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ name, description, price, category, image_url, stock_quantity }) {
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, category, image_url, stock_quantity]
        );
        return { id: result.insertId, ...arguments[0] };
    }

    static async update(id, { name, description, price, category, image_url, stock_quantity }) {
        // Validate parameters
        if (!name || !description || price === undefined || !category || stock_quantity === undefined) {
            throw new Error('Missing required fields for product update');
        }

        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, stock_quantity = ? WHERE id = ?',
            [name, description, parseFloat(price), category, image_url, parseInt(stock_quantity), id]
        );

        return { id, name, description, price, category, image_url, stock_quantity };
    }
    static async delete(id) {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        return true;
    }

    static async getCategories() {
        const [rows] = await pool.query('SELECT DISTINCT category FROM products');
        return rows.map(row => row.category);
    }

    static async findRandom(limit = 4) {
        // First get total count
        const [countRows] = await pool.query('SELECT COUNT(*) as total FROM products');
        const total = countRows[0].total;

        if (total <= limit) {
            // If we have fewer products than requested, return all
            const [rows] = await pool.query('SELECT * FROM products LIMIT ?', [limit]);
            return rows;
        }

        // Get random offset
        const offset = Math.floor(Math.random() * (total - limit));
        const [rows] = await pool.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    }
}

module.exports = Product;