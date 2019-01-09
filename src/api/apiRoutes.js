const router = require('express').Router();

// Bring in routes
const usersRoutes = require('../users/usersRoutes');
const coursesRoutes = require('../courses/coursesRoutes');

// Routes here will be behind api/
router.use('/users', usersRoutes);
router.use('/courses', coursesRoutes);

module.exports = router;
