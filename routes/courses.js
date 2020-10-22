const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');
const { auth, role } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(auth, role('publisher', 'admin'), addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(auth, role('publisher', 'admin'), updateCourse)
  .delete(auth, role('publisher', 'admin'), deleteCourse);

module.exports = router;
