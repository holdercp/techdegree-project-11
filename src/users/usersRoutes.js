const router = require('express').Router();

// users/
router
  .route('/')
  .get((req, res) => {
    res.json({
      result: 'Returns the currently authenticated user',
    });
  })
  .post((req, res) => {
    res.json({
      result: 'Creates a user, sets the Location header to "/", and returns no content',
    });
  });

module.exports = router;
