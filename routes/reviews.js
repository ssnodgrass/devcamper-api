const express = require('express');

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
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

router
  .route('/:id')
  .get(getReview)
  .put(auth, role('user', 'admin'), updateReview)
  .delete(auth, role('user', 'admin'), deleteReview);

module.exports = router;
