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

    const username = req.session.user.username, isbn =  req.params.isbn
    
    pool.query('DELETE FROM Favourites WHERE username = $1 AND isbn = $2', [username, isbn], (error, results) => {
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
    const username = req.session.user.username;
    pool.query("SELECT title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, Books.isbn as isbn FROM Favourites, Books where Favourites.username =$1 and Books.isbn = Favourites.isbn ORDER BY isbn ASC",[username], (error, results) => {
      if (error) {
        throw error
      }
      const FavouritesData = results.rows
      res.render('favourites', {
          data: FavouritesData,
          username: req.session.user.username,
          title: 'Favourites '
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