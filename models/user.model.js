const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	local: {
		username: { type: String, unique: true, required: true },
		password: { type: String, unique: false, required: true }
	},
	role: {
		type: String,
		required: true,
		default: "user",
		enum: ["user","admin"]
	},
	photos: []
});

userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
};

// MUST HASH BEFORE SAVE
userSchema.pre('save', function (next) {
	if (!this.local.password) {
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
