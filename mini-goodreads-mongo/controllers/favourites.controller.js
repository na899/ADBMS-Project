const favouritesModel = require('../models/favourites.model')
const config = require('../config/config.js')
const bookModel = require('../models/book.model')

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
        const favouritesInfo = await favouritesModel.find({username: req.session.user.username}, {isbn: 1, _id: 0}).exec()
        let isbnList = []
        for (let book of favouritesInfo)
        {
            isbnList.push(book["isbn"])
        }
        const favouritesData = await bookModel.find({isbn: { $in: isbnList }})
        console.log(favouritesData)
        res.render('favourites', {
            data: favouritesData,
            title: 'Shelf of Favourite Books'
        })
    } catch(err) {
        res.redirect(config.APP_BASE_URL + '/user/login')
    }
}

module.exports = {
    addBookFavourites: addBookFavourites,
    removeBookFavourites: removeBookFavourites,
    showBooksFavourites: showBooksFavourites
}