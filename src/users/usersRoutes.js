const router = require('express').Router();
const authorize = require('../middleware/authorize');
const User = require('./usersModel');

// users/
router
  .route('/')
  .get(authorize, (req, res) => {
    res.json(req.body.user);
  })
  .post((req, res, next) => {
    User.create(req.body, (err) => {
      if (err) {
        /* eslint-disable no-param-reassign */
        err.status = 400;
        return next(err);
      }

      res.location('/');
      return res.status(201).send(null);
    });
  });

module.exports = router;
