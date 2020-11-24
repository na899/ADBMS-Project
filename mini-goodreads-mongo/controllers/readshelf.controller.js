const currentShelfModel = require('../models/currentShelf.model')
const readShelfModel = require('../models/readShelf.model')
const toReadShelfModel = require('../models/toReadShelf.model')
const config = require('../config/config.js')
const bookModel = require('../models/book.model')

addBookReadShelf = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn
        const newShelfEntry = await readShelfModel.create({
            username,
            isbn  
        })
        await currentShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        await toReadShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("New book has been added to your Read Shelf")
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

removeBookReadShelf = async (req, res) => {
    try {
        const readShelfData = await readShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("Book deleted from your Read Shelf")
        res.sendStatus(200)
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

showBooksReadShelf = async (req, res) => {
    try
    {
        const readShelfInfo = await readShelfModel.find({username: req.session.user.username}, {isbn: 1, _id: 0}).exec()
        let isbnList = []
        for (let book of readShelfInfo)
        {
            isbnList.push(book["isbn"])
        }
        const readShelfData = await bookModel.find({isbn: { $in: isbnList }})
        console.log(readShelfData)
        res.render('readShelf', {
            data: readShelfData,
            title: 'Shelf of Books already Read'
        })
    } catch(err) {
        res.redirect(config.APP_BASE_URL + '/user/login')

    }
}

module.exports = {
    addBookReadShelf: addBookReadShelf,
    removeBookReadShelf: removeBookReadShelf,
    showBooksReadShelf: showBooksReadShelf
}