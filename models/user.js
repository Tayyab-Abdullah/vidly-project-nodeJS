const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255
    },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, "mySecretKey");
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}


exports.User = User; 
exports.validate = validateUser;