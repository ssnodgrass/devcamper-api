const express = require('express');

const {
  getReviews,
  getReview,
  createReview,
} = require('../controllers/reviews');

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const { auth, role } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(auth, role('user', 'admin'), createReview);

router.route('/:id').get(getReview);

module.exports = router;
