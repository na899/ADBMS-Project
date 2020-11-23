const toreadshelfRouter = require('express').Router();
const toreadshelfController = require('../controllers/toreadshelf.controller');

toreadshelfRouter.get('/add/:isbn',
    toreadshelfController.addBookToReadShelf
)
 
toreadshelfRouter.get('/remove/:isbn',
    toreadshelfController.removeBookToReadShelf
)

toreadshelfRouter.get('/showBooks',
    toreadshelfController.showBooksToReadShelf
)

module.exports = toreadshelfRouter