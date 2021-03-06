const reviewModel = require('../models/review.model')
const bookModel = require('../models/book.model')

addReviewForm = async (req, res) => {
    try
    {
        const bookData = await bookModel.findOne({isbn: req.params.isbn}).exec()
        res.render('addReviewForm', {
            bookData: bookData,
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
        const bookData = await bookModel.findOne({isbn: req.params.isbn}).exec()
        const reviewToEdit = await reviewModel.findOne({"isbn": req.params.isbn, "username": req.session.user.username}).exec()
        console.log(reviewToEdit);
        res.render('editReviewForm', {
            data: reviewToEdit,
            bookData: bookData,
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
        res.status(200).render('success.ejs',
        { notif:'Book review has been added successfully!'
        })
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
            res.status(200).render('success.ejs',
            { notif:'Book review has been edited successfully!'
            })
        } catch(err) {
            console.log(err)
            res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
        }
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

getAllReviewsByUser = async (req, res) => {
    try {
        const reviewData = await reviewModel.find({username: req.params.username}).exec()
        return res.send(reviewData)
        
    } catch(err)
    {
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

getAllReviewsByBook = async (req, res) => {
    try  {
        const reviewData = await reviewModel.find({isbn: req.params.isbn}).exec()
        const bookData = await bookModel.findOne({isbn: req.params.isbn}).exec()
        return res.render('reviews', {
            data: reviewData,
            bookData: bookData,
            isbn: req.params.isbn,
        })
        
    } catch(err)
    {
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

removeReview = async (req, res) => {
    try {
        await reviewModel.remove({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("Review deleted")
        res.status(200).render('success.ejs',
        { notif:'Book review has been removed successfully!'
        })
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
    getAllReviewsByUser: getAllReviewsByUser,
    getAllReviewsByBook: getAllReviewsByBook,
    removeReview: removeReview
}
