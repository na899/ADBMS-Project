const reviewModel = require('../models/review.model')

addReviewForm = (req, res) => {
    try
    {
        res.render('addReviewForm', {
            title: 'Add Review Details'
        })
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })        
    }
}

editReviewForm = async (req, res) => {
    try
    {
        const reviewToEdit = await reviewModel.findOne({"isbn": req.params.isbn, "username": req.session.user.username}).exec()
        res.render('editReviewForm', {
            data: reviewToEdit,
            title: 'Edit Review Details'
        })
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

addReviewData = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn, content = req.body.content, rating = req.body.rating
        const newReview = await reviewModel.create({
            username,
            isbn,
            content,
            rating
        })
        console.log("New review has been added")
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

editReviewData = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn, content = req.body.content, rating = req.body.rating
        const editReview = await reviewModel.findOne({username: req.session.user.username, isbn: req.params.isbn}).exec()
        Object.assign(editReview, {
            username,
            isbn,
            content,
            rating  
        })
        try {
            await editReview.save()
            console.log("Review has been edited")
            res.sendStatus(200)
        } catch(err) {
            console.log(err)
            res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
        }
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

getAllReviews = async (req, res) => {
    try {
        const reviewData = await reviewModel.find({}).exec()
        return res.send(reviewData)
        
    } catch(err)
    {
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

removeReview = async (req, res) => {
    try {
        await reviewModel.findOne({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("Review deleted")
        res.sendStatus(200)
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

module.exports = {
    addReviewForm: addReviewForm,
    editReviewForm: editReviewForm,
    addReviewData: addReviewData,
    editReviewData: editReviewData,
    getAllReviews: getAllReviews,
    removeReview: removeReview
}