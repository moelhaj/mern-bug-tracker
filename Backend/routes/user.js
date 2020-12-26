const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { auth } = require('../middleware/auth');
const { validateLogin, validateRegister } = require('../middleware/validator');


// Get All Users
router.get('/all', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Register
router.post('/register', validateRegister, async (req, res) => {
    const ip = req.connection.remoteAddress;
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json('Account taken, Try another');
    user = new User({ name, email, password, role });
    try {
        await user.save();
        const token = jwt.sign({ id: user._id, origin: ip }, config.SECRET, { expiresIn: '8h' });
        return res.status(200).json({ token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error, unable to register user');
    }
});

// Login
router.post('/login', validateLogin, async (req, res) => {
    const ip = req.connection.remoteAddress;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.verify(password))) return res.status(400).json('Wrong Credentials');
    try {
        const token = jwt.sign({ id: user._id, origin: ip }, config.SECRET, { expiresIn: '8h' });
        return res.status(200).json({ token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error, unable to login user');
    }
});

router.get('/verify', async (req, res) => {
    if (!req.header('Authorization')) return res.status(401).json(false);
    const token = req.header('Authorization').replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, config.SECRET);
        const { id, origin } = decoded;
        if (origin === req.connection.remoteAddress) {
            const user = await User.findById(id);
            return res.status(200).json({ token, user });
        } else {
            return res.status(401).json(false);
        }

    } catch (error) {
        return res.status(401).json(false);
    }
});

module.exports = router;