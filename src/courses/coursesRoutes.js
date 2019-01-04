const router = require('express').Router();

// courses/
router
  .route('/')
  .get((req, res) => {
    res.json({
      result: 'Returns the Course "_id" and "title" properties',
    });
  })
  .post((req, res) => {
    res.json({
      result: 'Creates a course, sets the Location header, and returns no content',
    });
  });

// courses/:courseId
router
  .route('/:courseId')
  .get((req, res) => {
    res.json({
      result: 'Returns all Course properties and related documents for the provided course ID',
    });
  })
  .put((req, res) => {
    res.json({
      result: 'Updates a course and returns no content',
    });
  });

// courses/:courseId/reviews
router.post('/:courseId/reviews', (req, res) => {
  res.json({
    result:
      'Creates a review for the specified course ID, sets the Location header to the related course, and returns no content',
  });
});

module.exports = router;
