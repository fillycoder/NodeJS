// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: function() { return !this.isOAuth; } },
    isOAuth: { type: Boolean, default: false },
    googleId: String,
    displayName: String
});

module.exports = mongoose.model('User', UserSchema);
