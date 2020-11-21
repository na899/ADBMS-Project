const config = require('../config/config.js')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})



/* Queries for Favourites */

const addBookFavourites = async (req, res) => {
  try {

    const username = req.session.user.username, isbn = req.params.isbn
    pool.query('INSERT INTO Favourites (username, isbn) VALUES ($1, $2)', [username, isbn], (error, results) => {
      if (error) {
        throw error
      }   

      console.log("New book has been added to your Favourites")
      res.sendStatus(200)
    })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const removeBookFavourites = async (req, res) => {
  try {

    const id = parseInt(req.params.id)

    pool.query('DELETE FROM Favourites WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      
      console.log("Book deleted from your Favourites")
      res.sendStatus(200)
    })
      
  } catch(err)
  {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const showBooksFavourites = async (req, res) => {
  try {
    const username = parseInt(req.params.id)
    pool.query('SELECT * FROM Favourites where username = $1 ORDER BY isbn ASC',[username], (error, results) => {
      if (error) {
        throw error
      }
      const FavouritesData = results.rows
      res.render('Favourites', {
          data: FavouritesData,
          title: 'Shelf of Books already Read'
      })
    })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

module.exports = {
    addBookFavourites,
    removeBookFavourites,
    showBooksFavourites
}