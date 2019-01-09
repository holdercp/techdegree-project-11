const auth = require('basic-auth');
const User = require('../users/usersModel');

module.exports = function authorize(req, res, next) {
  const creds = auth(req);

  // If no creds are sent, prevent access
  if (!creds) {
    const err = new Error('Access denied.');
    err.status = 401;
    next(err);
  }

  // Authenticate the user
  User.authenticate(creds.name, creds.pass, (err, user) => {
    if (err) return next(err);

    // And attach the user object to the request body
    req.body.user = user;
    return next();
  });
};
