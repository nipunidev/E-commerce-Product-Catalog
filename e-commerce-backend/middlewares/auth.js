const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Add this line
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const admin = (req, res, next) => {
    console.log('User role:', req.user.role); // Debug logging
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Admin access required',
            yourRole: req.user.role,
            requiredRole: 'admin'
        });
    }
    next();
};

module.exports = {
    authenticate,
    admin
};