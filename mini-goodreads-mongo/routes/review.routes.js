const reviewRouter = require('express').Router();
const reviewController = require('../controllers/review.controller');
const userController = require('../controllers/user.controller');

reviewRouter.get('/create/:isbn',
    userController.checkLogin,
    reviewController.addReviewForm
)

reviewRouter.get('/edit/:isbn',
    userController.checkLogin,
    reviewController.editReviewForm
)

reviewRouter.post('/:isbn',
    userController.checkLogin,
    reviewController.addReviewData
)

reviewRouter.put('/:isbn',
    userController.checkLogin,
    reviewController.editReviewData
)

reviewRouter.get('/book/:isbn',
    reviewController.getAllReviewsByBook
)

reviewRouter.get('/user/:username',
    reviewController.getAllReviewsByUser
)

reviewRouter.delete('/:isbn',
    userController.checkLogin,
    reviewController.removeReview
)

module.exports = reviewRouter