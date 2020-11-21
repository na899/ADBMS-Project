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
    pool.query('INSERT INTO ReadShelf (username, isbn) VALUES ($1, $2)', [username, isbn], (error, results) => {
      if (error) {
        throw error
      }   

      console.log("New book has been added to your Read Shelf")
      res.sendStatus(200)
    })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const removeBookReadShelf = async (req, res) => {
  try {

    const id = parseInt(request.params.id)

    pool.query('DELETE FROM ReadShelf WHERE id = $1', [id], (error, results) => {
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
    const username = parseInt(request.params.id)
    pool.query('SELECT * FROM ReadShelf where username = $1 ORDER BY isbn ASC',[username], (error, results) => {
      if (error) {
        throw error
      }
      const readShelfData = results.rows
      res.render('readShelf', {
          data: readShelfData,
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