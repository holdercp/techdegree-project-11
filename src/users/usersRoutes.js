const router = require('express').Router();

const User = require('./usersModel');

// users/
router
  .route('/')
  .get((req, res) => {
    res.json({
      result: 'Returns the currently authenticated user',
    });
  })
  .post((req, res, next) => {
    User.create(req.body, (err) => {
      if (err) return next(err);

      res.location('/');
      return res.status(201).send(null);
    });
  });

module.exports = router;
