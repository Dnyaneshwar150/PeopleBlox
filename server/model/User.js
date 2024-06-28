// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//user Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
    }
});

const saltRounds = 12;

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Check if the account is locked
UserSchema.methods.isLocked = function() {
    return this.lockUntil && this.lockUntil > Date.now();
};

module.exports = mongoose.model('User', UserSchema);
