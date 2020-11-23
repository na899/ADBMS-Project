const currentShelfModel = require('../models/currentShelf.model')
const readShelfModel = require('../models/readShelf.model')
const toReadShelfModel = require('../models/toReadShelf.model')
const config = require('../config/config.js')
const bookModel = require('../models/book.model')

addBookToReadShelf = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn
        const newShelfEntry = await toReadShelfModel.create({
            username,
            isbn  
        })
        await readShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        await currentShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("New book has been added to your To Read Shelf")
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

removeBookToReadShelf = async (req, res) => {
    try {
        const toReadShelfData = await toReadShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("Book deleted from your To Read Shelf")
        res.sendStatus(200)
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

showBooksToReadShelf = async (req, res) => {
    try
    {
        const toReadShelfInfo = await toReadShelfModel.find({username: req.session.user.username}, {isbn: 1, _id: 0}).exec()
        let isbnList = []
        for (let book of toReadShelfInfo)
        {
            isbnList.push(book["isbn"])
        }
        const toReadShelfData = await bookModel.find({isbn: { $in: isbnList }})
        console.log(toReadShelfData)
        res.render('toReadShelf', {
            data: toReadShelfData,
            title: 'Shelf of Books to Read'
        })
    } catch(err) {
        res.redirect(config.APP_BASE_URL + '/user/login')
    }
}

module.exports = {
    addBookToReadShelf: addBookToReadShelf,
    removeBookToReadShelf: removeBookToReadShelf,
    showBooksToReadShelf: showBooksToReadShelf
}