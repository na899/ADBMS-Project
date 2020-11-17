const readShelfModel = require('../models/readShelf.model')

addBookReadShelf = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn
        const newShelfEntry = await readShelfModel.create({
            username,
            isbn  
        })
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
        const readShelfData = await readShelfModel.find({username: req.session.user.username}).exec()
        res.render('readShelf', {
            data: readShelfData,
            title: 'Read Shelf Books'
        })
    } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

module.exports = {
    addBookReadShelf: addBookReadShelf,
    removeBookReadShelf: removeBookReadShelf,
    showBooksReadShelf: showBooksReadShelf
}