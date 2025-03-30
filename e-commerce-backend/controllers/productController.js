const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { category, search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const products = await Product.findAll({ category, search, sortBy, sortOrder, limit, offset });
        const total = await Product.count({ category, search });

        res.json({
            products,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock_quantity } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image_url,
            stock_quantity
        });

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        const { name, description, price, category, stock_quantity } = req.body;
        let image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

        // Validate required fields
        if (!name || !description || !price || !category || !stock_quantity) {
            return res.status(400).json({
                message: 'All fields are required',
                missingFields: {
                    name: !name,
                    description: !description,
                    price: !price,
                    category: !category,
                    stock_quantity: !stock_quantity
                }
            });
        }

        const product = await Product.update(req.params.id, {
            name,
            description,
            price: parseFloat(price),
            category,
            image_url,
            stock_quantity: parseInt(stock_quantity)
        });

        res.json(product);
    } catch (err) {
        console.error('Update product error:', err);
        res.status(500).json({
            message: 'Server error',
            error: err.message,
            sql: err.sql
        });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        await Product.delete(req.params.id);
        res.json({ message: 'Product removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.getCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};