const currentShelfModel = require('../models/currentShelf.model')

addBookCurrentShelf = async (req, res) => {
    try
    {
        const username = req.session.user.username, isbn = req.params.isbn
        const newShelfEntry = await currentShelfModel.create({
            username,
            isbn  
        })
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

module.exports = {
    addBookCurrentShelf: addBookCurrentShelf,
    removeBookCurrentShelf: removeBookCurrentShelf
}