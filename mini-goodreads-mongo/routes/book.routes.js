const bookRouter = require('express').Router();
const bookController = require('../controllers/book.controller');

bookRouter.get('/create',
    bookController.addBookForm
)

bookRouter.get('/edit/:isbn',
    bookController.editBookForm
)

bookRouter.post('/',
    bookController.addBookData
)

bookRouter.put('/',
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