const currentShelfModel = require('../models/currentShelf.model')
const readShelfModel = require('../models/readShelf.model')
const toReadShelfModel = require('../models/toReadShelf.model')
const config = require('../config/config.js')
const bookModel = require('../models/book.model')

addBookCurrentShelf = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn
        const newShelfEntry = await currentShelfModel.create({
            username,
            isbn  
        })
        await readShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        await toReadShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("New book has been added to your Current Shelf")
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

removeBookCurrentShelf = async (req, res) => {
    try {
        const currentShelfData = await currentShelfModel.findOneAndDelete({username: req.session.user.username, isbn: req.params.isbn}).exec()
        console.log("Book deleted from your Current Shelf")
        res.sendStatus(200)
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

showBooksCurrentShelf = async (req, res) => {
    try
    {
        const currentShelfInfo = await currentShelfModel.find({username: req.session.user.username}, {isbn: 1, _id: 0}).exec()
        let isbnList = []
        for (let book of currentShelfInfo)
        {
            isbnList.push(book["isbn"])
        }
        const currentShelfData = await bookModel.find({isbn: { $in: isbnList }})
        console.log(currentShelfData)
        res.render('currentShelf', {
            data: currentShelfData,
            title: 'Shelf of Books Currently Reading'
        })
    } catch(err) {
        res.redirect(config.APP_BASE_URL + '/user/login')
    }
}

module.exports = {
    addBookCurrentShelf: addBookCurrentShelf,
    removeBookCurrentShelf: removeBookCurrentShelf,
    showBooksCurrentShelf: showBooksCurrentShelf
}