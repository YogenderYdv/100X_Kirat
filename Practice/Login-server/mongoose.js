const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yogender2603:2asa0DhmgIW59O2h@cluster0.dicszan.mongodb.net/')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
