const config = require('../config/config.js')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})



/* Queries for Read Shelf  */

const addBookReadShelf = async (req, res) => {
  try {

    const username = req.session.user.username, isbn = req.params.isbn
    pool.query('INSERT INTO ReadShelf ( username, isbn) VALUES ($1, $2)', [ username, isbn], (error, results) => {
      if (error) {
        throw error
      }
      pool.query('DELETE FROM CurrentShelf WHERE username = $1 AND isbn = $2', [username, isbn], (error, result) => {
        if (error) {
         throw error
        }
        pool.query('DELETE FROM WantToReadShelf WHERE username = $1 AND isbn = $2', [username, isbn], (error, Results) => {
          if (error) {
           throw error
          }
          console.log("Book has been added to your Read Shelf")
          return res.redirect(config.APP_BASE_URL + 'readshelf/showBooks')
        })
      })
      
    })
    
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const removeBookReadShelf = async (req, res) => {
  try {

    const username = req.session.user.username, isbn =  req.params.isbn
    
    pool.query('DELETE FROM ReadShelf WHERE username = $1 AND isbn = $2', [username, isbn], (error, results) => {
      if (error) {
        throw error
      }
      
      console.log("Book deleted from your Read Shelf")
      res.sendStatus(200)
    })
      
  } catch(err)
  {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const showBooksReadShelf = async (req, res) => {
  try {
    const username = req.session.user.username;
    pool.query("SELECT title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, Books.isbn as isbn FROM ReadShelf, Books where ReadShelf.username =$1 and Books.isbn = ReadShelf.isbn ORDER BY isbn ASC",[username], (error, results) => {
      if (error) {
        throw error
      }
      const readShelfData = results.rows
      res.render('readShelf', {
          data: readShelfData,
          username: username,
          title: 'Shelf of Books already Read'
      })
    })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}



module.exports = {
    addBookReadShelf,
    removeBookReadShelf,
    showBooksReadShelf
}