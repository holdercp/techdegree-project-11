const router = require('express').Router();
const authorize = require('../middleware/authorize');
const Course = require('./coursesModel');
const Review = require('../reviews/reviewsModel');

// courses/
router
  .route('/')
  .get((req, res, next) => {
    Course.find({})
      // Return just id and title
      .select('_id title')
      .exec((err, courses) => {
        if (err) return next(err);

        return res.json(courses);
      });
  })
  .post(authorize, (req, res, next) => {
    Course.create(req.body, (err) => {
      // Mongoose will handle validation, this will catch it
      if (err) {
        /* eslint-disable no-param-reassign */
        err.status = 400;
        return next(err);
      }

      // Set location and return a "Created" status with no payload
      res.location('/');
      return res.status(201).send(null);
    });
  });

// courses/:courseId
router
  .route('/:courseId')
  .get((req, res, next) => {
    Course.findById(req.params.courseId)
      // Deep population to prevent retrieving password, etc.
      .populate('user', 'fullName')
      .populate('reviews')
      .exec((err, course) => {
        if (err) return next(err);

        if (!course) {
          const error = new Error('Course not found.');
          error.status = 404;
          return next(error);
        }

        return res.json(course);
      });
  })
  .put(authorize, (req, res, next) => {
    Course.findByIdAndUpdate(req.params.courseId, { $set: req.body }, (err, course) => {
      if (err) {
        /* eslint-disable no-param-reassign */
        err.status = 400;
        return next(err);
      }

      if (!course) {
        const error = new Error('Course not found.');
        error.status = 404;
        return next(error);
      }

      return res.status(204).send(null);
    });
  });

// courses/:courseId/reviews
router.post('/:courseId/reviews', authorize, (req, res, next) => {
  // Grab the course
  Course.findById(req.params.courseId)
    .then((course) => {
      if (!course) {
        const err = new Error('Course not found.');
        err.status = 404;
        return next(err);
      }

      // Users cannot review their own course
      if (course.user.toString() === req.body.user.id) {
        const err = new Error('You cannot review your own course.');
        err.status = 400;
        return next(err);
      }

      // Create the review then append it to the end of the course reviews arr
      return Review.create(req.body).then((review) => {
        course.reviews.push(review);
        course.save((err) => {
          if (err) return next(err);

          // Set location and return no payload
          res.location('/');
          return res.status(201).send(null);
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
