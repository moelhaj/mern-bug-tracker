const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcryptjs');

const userSchema = Schema(
    {
        name: { type: String, required: true, max: 50 },
        email: { type: String, required: true, max: 255, },
        password: { type: String, required: true, min: 8, max: 1024 },
        role: { type: String, enum: ['user', 'admin'], required: true }
    }
    , { timestamps: true }
);

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 12)
    }
});

userSchema.methods.verify = function (password) {
    return compare(password, this.password);
};

userSchema.set('toJSON', {
    transform: (doc, { __v, password,createdAt, updatedAt, ...rest }, options) => rest
})

module.exports = model('User', userSchema);