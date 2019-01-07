const auth = require('basic-auth');
const User = require('../users/usersModel');

module.exports = function authorize(req, res, next) {
  const creds = auth(req);

  if (!creds) {
    const err = new Error('Access denied.');
    err.status = 401;
    next(err);
  }

  User.authenticate(creds.name, creds.pass, (err, user) => {
    if (err) return next(err);

    req.body.user = user;
    return next();
  });
};
