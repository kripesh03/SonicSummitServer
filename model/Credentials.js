const mongoose = require('mongoose');

const credSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // New field
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" }, // New field
    bio: { type: String, default: "" } // New field
});

const Cred = mongoose.model('creds', credSchema);

module.exports = Cred;
