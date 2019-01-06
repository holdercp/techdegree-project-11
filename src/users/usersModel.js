const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unqiue: true,
    match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.authenticate = function authenticateUser(emailAddress, password, callback) {
  this.findOne({ emailAddress }, (err, user) => {
    if (err) return callback(err);

    if (!user) {
      const error = new Error('User not found.');
      error.status = 400;
      return callback(error);
    }

    const hash = user.password;
    return bcrypt.compare(password, hash).then((res) => {
      if (res) return callback(null, user);

      const error = new Error('Invalid password.');
      error.status = 400;
      return callback(error);
    });
  });
};

UserSchema.pre('save', function hashPassword(next) {
  const user = this;
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
