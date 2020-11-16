const toReadShelfModel = require('../models/toReadShelf.model')

addBookToReadShelf = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn
        const newShelfEntry = await toReadShelfModel.create({
            username,
            isbn  
        })
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

module.exports = {
    addBookToReadShelf: addBookToReadShelf,
    removeBookToReadShelf: removeBookToReadShelf
}