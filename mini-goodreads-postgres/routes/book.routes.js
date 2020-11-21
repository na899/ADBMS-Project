const bookRouter = require('express').Router();
const bookController = require('../db/book')

bookRouter.get('/create',
    bookController.addBookForm
)

bookRouter.get('/edit/:isbn',
    bookController.editBookForm
)

bookRouter.post('/create',
    bookController.addBookData
)

bookRouter.post('/edit/:isbn',
    bookController.editBookData
)

bookRouter.get('/',
    bookController.getAllBooks
)

bookRouter.get('/:isbn',
    bookController.getBook
)

bookRouter.delete('/:isbn',
    bookController.removeBook
)

module.exports = bookRouter