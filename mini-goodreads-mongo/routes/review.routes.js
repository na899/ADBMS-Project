const reviewRouter = require('express').Router();
const reviewController = require('../controllers/review.controller');
const userController = require('../controllers/user.controller');

reviewRouter.get('/create/:isbn',
    reviewController.addReviewForm
)

reviewRouter.get('/edit/:isbn',
    reviewController.editReviewForm
)

reviewRouter.post('/create/:isbn',
    reviewController.addReviewData
)

reviewRouter.post('/edit/:isbn',
    reviewController.editReviewData
)

reviewRouter.get('/book/:isbn',
    reviewController.getAllReviewsByBook
)

reviewRouter.get('/user/:username',
    reviewController.getAllReviewsByUser
)

reviewRouter.get('/remove/:isbn',
    reviewController.removeReview
)

module.exports = reviewRouter