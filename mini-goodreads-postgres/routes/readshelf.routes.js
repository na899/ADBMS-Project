const readshelfRouter = require('express').Router();
const readshelfController = require('../db/readShelf');

readshelfRouter.get('/add/:isbn',
    readshelfController.addBookReadShelf
)
 
readshelfRouter.get('/remove/:isbn',
    readshelfController.removeBookReadShelf
)

readshelfRouter.get('/showBooks',
    readshelfController.showBooksReadShelf
)

module.exports = readshelfRouter