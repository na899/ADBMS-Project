const currentshelfRouter = require('express').Router();
const currentshelfController = require('../controllers/currentshelf.controller');

currentshelfRouter.get('/add/:isbn',
    currentshelfController.addBookCurrentShelf
)
 
currentshelfRouter.get('/remove/:isbn',
    currentshelfController.removeBookCurrentShelf
)

currentshelfRouter.get('/showBooks',
    currentshelfController.showBooksCurrentShelf
)

module.exports = currentshelfRouter