const readshelfRouter = require('express').Router();
const readshelfController = require('../controllers/readshelf.controller');

readshelfRouter.get('/add/:isbn',
    readshelfController.addBookReadShelf
)
 
readshelfRouter.get('/remove/:isbn',
    readshelfController.removeBookReadShelf
)

module.exports = readshelfRouter