const bookModel = require('../models/book.model')
const reviewModel = require('../models/review.model')

addBookForm = (req, res) => {
    try
    {
        res.render('addBookForm', {
            title: 'Add Book Details'
        })
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })        
    }
}

editBookForm = async (req, res) => {
    try
    {
        const bookToEdit = await bookModel.findOne({"isbn": req.params.isbn}).exec()
        res.render('editBookForm', {
            data: bookToEdit,
            title: 'Edit Book Details'
        })
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

addBookData = async (req, res) => {
    try
    {
        const { title, authors, rating, coverPhoto, description, publishDate, publisher, genres, pages, isbn} = req.body
        const newBook = await bookModel.create({
            title,
            authors,
            rating,
            coverPhoto,
            description,
            publishDate,
            publisher,
            genres,
            pages,
            isbn  
        })
        console.log("New book has been added")
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

editBookData = async (req, res) => {
    try
    {
        const { title, authors, rating, coverPhoto, description, publishDate, publisher, genres, pages, isbn} = req.body
        const editBook = await bookModel.findOne({isbn: req.params.isbn}).exec()
        Object.assign(editBook, {
            title,
            authors,
            rating,
            coverPhoto,
            description,
            publishDate,
            publisher,
            genres,
            pages,
            isbn  
        })
        try {
            await editBook.save()
            console.log("Book has been edited")
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

getAllBooks = async (req, res) => {
    try {
        const booksData = await bookModel.find({}).populate('reviews').exec()
        return res.render('showAllBooks', {
            booksData : booksData,
        })
        
    } catch(err)
    {
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

getBook = async (req, res) => {
    try {
        const bookData = await bookModel.findOne({isbn: req.params.isbn}).populate('reviews').exec()
        return res.json(bookData)
    } catch(err)
    {
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

removeBook = async (req, res) => {
    try {
        await bookModel.findOne({isbn: req.params.isbn}).exec()
        console.log("Book deleted")
        res.sendStatus(200)
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

module.exports = {
    addBookForm: addBookForm,
    editBookForm: editBookForm,
    addBookData: addBookData,
    editBookData: editBookData,
    getAllBooks: getAllBooks,
    getBook: getBook,
    removeBook: removeBook
}