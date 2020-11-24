const config = require('../config/config.js')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})



/* Queries for Books */

const addBookForm = (req, res) => {
  try {
      res.render('addBookForm', {
          title: 'Add Book Details',
          username: req.session.user.username
      })
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })        
  }
}

const editBookForm = async (req, res) => {
  try {
    const isbn = parseInt(req.params.isbn)
    
    pool.query('SELECT * FROM Books WHERE isbn = $1', [isbn], (error, results) => {
      if (error) {
        throw error
      }
      const bookToEdit = results.rows[0]
      res.render('editBookForm', {
        data: bookToEdit,
        username: req.session.user.username,
        title: 'Edit Book Details'
      })
      
    })
    
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const addBookData = async (req, res) => {
  try {
    const { title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, isbn } = req.body
    pool.query('INSERT INTO Books (title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, isbn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, isbn], (error, results) => {
      if (error) {
        throw error
      }
      
      console.log("New book has been added")
      res.status(200).render('success.ejs', { notif:'New book has been added successfully!' })
    })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const editBookData = async (req, res) => {
  try {

    const isbn = parseInt(req.params.id)
    const { title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages } = req.body
    pool.query('UPDATE Books SET title = $1, authors = $2, rating = $3, coverphoto = $4, description = $5, publishdate = $6, publisher = $7, genre = $8, pages = $9 WHERE isbn = $10', [title, authors, rating, coverphoto, description, publishdate, publisher, genre, pages, isbn], (error, results) => {
      if (error) {
        throw error
      }
    
      try {
        console.log("Book has been edited")
        res.status(200).render('success.ejs', { notif:'Book details have been edited successfully!', username: req.session.user.username })
      } catch(err) {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
  })
      
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const getAllBooks = async (req, res) => {
  try {
      pool.query('SELECT * FROM Books ORDER BY title ASC', (error, results) => {
        if (error) {
          throw error
        }
        
        const booksData = results.rows
        return res.render('showAllBooks', {
          booksData : booksData,
          username: req.session.user.username
        })
      })
    } catch(err)
    {
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

const getBook = async (req, res) => {
  try {
    
    const isbn = parseInt(req.params.isbn)
    
    pool.query('SELECT * FROM Books WHERE isbn = $1', [isbn], (error, results) => {
      if (error) {
        throw error
      }
      const bookData = results.rows[0]
      return res.json(bookData)
    })
  } catch(err)
  {
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}


const removeBook = async (req, res) => {
  try {

    const isbn = parseInt(req.params.isbn)

    pool.query('DELETE FROM Books WHERE isbn = $1', [isbn], (error, results) => {
      if (error) {
        throw error
      }
      console.log("Book deleted")
      res.sendStatus(200)
    })

  } catch(err)
  {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}


module.exports = {
 
    /*Books */
    getBook,
    getAllBooks,
    addBookData,
    editBookData,
    removeBook,
    editBookForm,
    addBookForm
}