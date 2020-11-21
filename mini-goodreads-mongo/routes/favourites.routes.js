const favouritesRouter = require('express').Router();
const favouritesController = require('../controllers/favourites.controller');

favouritesRouter.get('/add/:isbn',
    favouritesController.addBookFavourites
)
 
favouritesRouter.get('/remove/:isbn',
    favouritesController.removeBookFavourites
)

favouritesRouter.get('/showBooks',
    favouritesController.showBooksFavourites
)

module.exports = favouritesRouter