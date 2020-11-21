const favouritesModel = require('../models/favourites.model')

addBookFavourites = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn
        const newFavouriteEntry = await favouritesModel.create({
            username,
            isbn  
        })
        console.log("New book has been added to your Favourites")
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

removeBookFavourites = async (req, res) => {
    try {
        const favouritesData = await favouritesModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("Book deleted from your Favourites")
        res.sendStatus(200)
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

showBooksFavourites = async (req, res) => {
    try
    {
        const favouritesData = await favouritesModel.find({username: req.session.user.username}).exec()
        res.render('favourites', {
            data: favouritesData,
            title: 'Shelf of Favourite Books'
        })
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

module.exports = {
    addBookFavourites: addBookFavourites,
    removeBookFavourites: removeBookFavourites,
    showBooksFavourites: showBooksFavourites
}