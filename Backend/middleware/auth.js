const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
    if (!req.header('Authorization')) return res.status(401).json('Access denied');
    const token = req.header('Authorization').replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, config.SECRET);
        const { id, origin } = decoded;
        if(origin === req.connection.remoteAddress) {
            req.id = id;
            next();
        } else {
            return res.status(401).json('Access denied');
        }
    } catch (error) {
        return res.status(401).json('Access denied');
    }
};

exports.admin = async (req, res, next) => {
    if (!req.header('Authorization')) return res.status(401).send('Access denied');
    const token = req.header('Authorization').replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, config.SECRET);
        const { id } = decoded;
        const user = await User.findOne({_id: id});
        if (user.role === 'admin') {
            req.name = user.name;
            next();
        } else {
            return res.status(401).json('Administrative privileges required');
        }
    } catch (error) {
        return res.status(401).json('Access denied');
    }
};