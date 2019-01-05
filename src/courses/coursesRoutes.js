const router = require('express').Router();

const Course = require('./coursesModel');

// courses/
router
  .route('/')
  .get((req, res, next) => {
    Course.find({})
      .select('_id title')
      .exec((err, courses) => {
        if (err) return next(err);

        return res.json(courses);
      });
  })
  .post((req, res, next) => {
    Course.create(req.body, (err) => {
      if (err) return next(err);

      res.location('/');
      return res.status(201).send(null);
    });
  });

// courses/:courseId
router
  .route('/:courseId')
  .get((req, res, next) => {
    Course.findById(req.params.courseId, (err, course) => {
      if (err) return next(err);

      return res.json(course);
    });
  })
  .put((req, res, next) => {
    Course.findByIdAndUpdate(req.params.courseId, { $set: req.body }, (err, course) => {
      if (err) return next(err);

      if (course) return res.status(204).send(null);

      return next(new Error('Course not found.'));
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
