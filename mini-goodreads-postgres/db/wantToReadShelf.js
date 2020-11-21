const config = require('../config/config.js')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})



/* Queries for  Want To Read Shelf */

const addBookToReadShelf = async (req, res) => {
  try {

    const username = req.session.user.username, isbn = req.params.isbn
    pool.query('INSERT INTO WantToReadShelf (username, isbn) VALUES ($1, $2)', [ username, isbn], (error, results) => {
      if (error) {
        throw error
      }
      console.log("New book has been added to your To Read Shelf")
      res.sendStatus(200)
    })  
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const removeBookToReadShelf = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM WantToReadShelf WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log("Book deleted from your To Read Shelf")
      res.sendStatus(200)
    })
      
  } catch(err)
  {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const showBooksToReadShelf = async (req, res) => {
  try {

    const username = parseInt(request.params.id)
    pool.query('SELECT title, authors, rating, coverPhoto, description, publishDate, publisher, genre, pages, Book.isbn as isbn FROM WantToReadShelf, Book where WantToReadShelf.username = $1 and Book.isbn = WantToReadShelf.isbn ORDER BY isbn ASC',[username], (error, results) => {
      if (error) {
        throw error
      }

      const toReadShelfData = results.rows
      res.render('toReadShelf', {
          data: toReadShelfData,
          title: 'Shelf of Books I want to Read'
      })
    })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

module.exports = {
    /*Want to Read shelf */
    addBookToReadShelf,
    removeBookToReadShelf,
    showBooksToReadShelf
}