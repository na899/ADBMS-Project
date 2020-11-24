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
      pool.query('DELETE FROM ReadShelf WHERE username = $1 AND isbn = $2', [username, isbn], (error, result) => {
        if (error) {
         throw error
        }
        pool.query('DELETE FROM CurrentShelf WHERE username = $1 AND isbn = $2', [username, isbn], (error, Results) => {
          if (error) {
           throw error
          }
          console.log("Book has been added to your Want to Read Shelf")
          return res.redirect(config.APP_BASE_URL + 'toreadshelf/showBooks')
        })
      })
      
    })
      
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const removeBookToReadShelf = async (req, res) => {
  try {
    const username = req.session.user.username, isbn =  req.params.isbn

    pool.query('DELETE FROM WantToReadShelf WHERE username = $1 AND isbn = $2', [username, isbn], (error, results) => {
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

    const username = req.session.user.username;
    pool.query("SELECT title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, Books.isbn as isbn FROM WantToReadShelf, Books where WantToReadShelf.username =$1 and Books.isbn = WantToReadShelf.isbn ORDER BY isbn ASC",[username], (error, results) => {
      if (error) {
        throw error
      }

      const toReadShelfData = results.rows
      res.render('toReadShelf', {
          data: toReadShelfData,
          title: 'Shelf of Books I want to Read',
          username: username
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