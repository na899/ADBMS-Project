const currentshelfRouter = require('express').Router();
const currentshelfController = require('../controllers/currentshelf.controller');

currentshelfRouter.get('/add/:isbn',
    currentshelfController.addBookCurrentShelf
)
 
currentshelfRouter.get('/remove/:isbn',
    currentshelfController.removeBookCurrentShelf
)

module.exports = currentshelfRouter