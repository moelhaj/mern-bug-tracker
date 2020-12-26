exports.validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
        if (!/\S+@\S+\.\S+/.test(email.toLowerCase())) {
            return res.status(400).json('Invalid Email');
        }
        next();
    } else {
        return res.status(400).json('Email and password are required');
    }
};

exports.validateRegister = async (req, res, next) => {
    req.body.role = req.body.role.toLowerCase();
    const { name, email, password, confirm_password, role } = req.body;
    if (name && email && password && role) {
        if (!/^[a-zA-Z ]{3,30}$/.test(name)) {
            return res.status(400).json('Name can be between 3 to 30 characters, only alphabetical characters, uppercase or lowercase');
        }
        if (!/\S+@\S+\.\S+/.test(email.toLowerCase())) {
            return res.status(400).json('Invalid Email');
        }
        if(!/^(?=.{8,20})/.test(password)){
            return res.status(400).json('Password must be between 8 and 20 charactes');
        }
        if(!/^(?=.*[a-z])/.test(password)){
            return res.status(400).json('Password must contain at least 1 lowercase alphabetical character');
        }
        if(!/^(?=.*[A-Z])/.test(password)){
            return res.status(400).json('Password must contain at least 1 uppercase alphabetical character');
        }
        if(!/^(?=.*[0-9])/.test(password)){
            return res.status(400).json('Password must contain at least 1 numeric character');
        }
        if(!/^(?=.*[!@#\$%\^&\*.])/.test(password)){
            return res.status(400).json('Password must contain at least 1 special character');
        }
        if (password !== confirm_password) {
            return res.status(400).json('Passwords didn\'t match');
        }
        if (!role === "admin" || !role === "user") {
            return res.status(400).json('Invalid role');
        }
        next();
    } else {
        return res.status(400).json('Name, email, password, and role are required');
    }
};