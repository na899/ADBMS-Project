const config = require('../config/config.js')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})


/* Queries for Reviews */

const addReviewForm = (req, res) => {
  try
  {
    pool.query('SELECT * FROM Books where isbn = $1',[req.params.isbn], (error, result) => {
      if (error) {
        throw error
      }

      let bookData = result.rows[0];
    
      res.render('addReviewForm', {
        bookData: bookData,
        title: 'Add Review Details'
    })
    })

  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })        
  }
}

const editReviewForm = async (req, res) => {
  try
  {
    
    pool.query('SELECT * FROM Reviews WHERE username = $1 and isbn = $2', [req.session.user.username, req.params.isbn], (error, results) => {
      if (error) {
        throw error
      }
      const reviewToEdit = results.rows[0];
      pool.query('SELECT * FROM Books WHERE isbn = $1', [req.params.isbn], (error, result) => {
        if (error) {
          throw error
        }
        const bookData = result.rows[0];
      res.render('editReviewForm', {
        data: reviewToEdit,
        bookData: bookData,
        title: 'Edit Review Details'
      })
    })
  })
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const addReviewData = async (req, res) => {
  try {
    const username = req.session.user.username, isbn = req.params.isbn, content = req.body.content, rating = req.body.rating
    const date = new Date();
    pool.query('INSERT INTO Reviews (username, isbn, content, date, rating ) VALUES ($1, $2, $3, $4, $5)', [username, isbn, content, date, rating ], (error, results) => {
      if (error) {
        throw error
      }
      console.log("New review has been added")
      res.status(200).render('success.ejs',
        { notif:'Book review has been added successfully!'
        })
    })      
      
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}


const editReviewData = async (req, res) => {
  try {
      const username = req.session.user.username, isbn = req.params.isbn, content = req.body.content, rating = req.body.rating
      
      const date = new Date();
      pool.query('UPDATE Reviews SET  content = $3, date = $4, rating = $5  WHERE username = $1 and isbn = $2', [username, isbn, content, date, rating], (error, results) => {
        if (error) {
          throw error
        }
        console.log("Review has been edited")
        res.status(200).render('success.ejs',
        { notif:'Book review has been added successfully!'
        })
      })
  } catch(err) {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}


const getAllReviewsByUser = async (req, res) => {
  try {
    const username = req.params.username

    pool.query('SELECT * FROM Reviews WHERE username = $1 ORDER BY date DESC', [username], (error, results) => {
      if (error) {
        throw error
      }
      return res.send(results.rows)
    })
  } catch(err)
  {
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const getAllReviewsByBook = async (req, res) => {
  try {
    const isbn = parseInt(req.params.isbn)
    pool.query('SELECT * FROM Reviews where isbn = $1 ORDER BY date DESC',[isbn], (error, results) => {
      if (error) {
        throw error
      }
      let reviewData = results.rows;
      pool.query('SELECT * FROM Books where isbn = $1',[isbn], (error, result) => {
        if (error) {
          throw error
        }

        let bookData = result.rows[0];
      
      return res.render('reviews', {
        data: reviewData,
        bookData: bookData,
        isbn: req.params.isbn,
      })
      })
      
    })

    
      
  } catch(err)
  {
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const getReviewsForBook = (req, res) => {
  const isbn = parseInt(req.params.isbn)
  pool.query('SELECT * FROM Reviews where isbn = $1 ORDER BY date DESC',[isbn], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}


const removeReview = async (req, res) => {
  try {

    const id = parseInt(req.params.id)

    pool.query('DELETE FROM Reviews WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log("Review deleted")
      res.sendStatus(200)
    })      
      
  } catch(err)
  {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}


module.exports = {

  /*Reviews */
  addReviewForm,
  editReviewForm,
  addReviewData,
  editReviewData,
  getAllReviewsByUser,
  getAllReviewsByBook,
  getReviewsForBook,
  removeReview
 
}