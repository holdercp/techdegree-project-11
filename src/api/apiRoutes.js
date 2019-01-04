const router = require('express').Router();

const usersRoutes = require('../users/usersRoutes');
const coursesRoutes = require('../courses/coursesRoutes');

router.use('/users', usersRoutes);
router.use('/courses', coursesRoutes);

module.exports = router;
