const config = require('../config/config.js')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})



/* Queries for Current Shelf */



const addBookCurrentShelf = async (req, res) => {
  try{

    const username = req.session.user.username, isbn = req.params.isbn

    pool.query('INSERT INTO CurrentShelf ( username, isbn) VALUES ($1, $2)', [ username, isbn], (error, results) => {
      if (error) {
        throw error
      }
      console.log("New book has been added to your Current Shelf")
      res.sendStatus(200)
    })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}


const removeBookCurrentShelf = async (req, res) => {
  try {
    const username = req.session.user.username, isbn =  req.params.isbn
    
    pool.query('DELETE FROM CurrentShelf WHERE username = $1 AND isbn = $2', [username, isbn], (error, results) => {
      if (error) {
       throw error
      }
      console.log("Book deleted from your Current Shelf")
      res.sendStatus(200)
    })
      
  } catch(err)
  {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}


const showBooksCurrentShelf = async (req, res) => {
  try{
    const username = req.session.user.username;
    pool.query("SELECT title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, Books.isbn as isbn FROM CurrentShelf, Books where CurrentShelf.username =$1 and Books.isbn = CurrentShelf.isbn ORDER BY isbn ASC",[username], (error, results) => {      if (error) {
        throw error
      }
    const currentShelfData = results.rows
    res.render('currentShelf', {
      data: currentShelfData,
      title: 'Shelf of Books Currently Reading'
    })
  })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}



module.exports = {
    /*Current shelf */
    showBooksCurrentShelf,
    addBookCurrentShelf,
    removeBookCurrentShelf

}