const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'minigoodreads',
  password: 'password',
  port: 5432,
})


/* Queries for Users */
const getUsers = (request, response) => {
  pool.query('SELECT * FROM Users ORDER BY joindate DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM Users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { username, password, name, email, profilePhoto, joinDate, isAdmin, session } = request.body

  pool.query('INSERT INTO Users (username, password, name, email, profilePhoto, joinDate, isAdmin, session) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [username, password, name, email, profilePhoto, joinDate, isAdmin, session], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added: ${results}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE Users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}


/* Queries for Books */
const getBooks = (request, response) => {
  pool.query('SELECT * FROM Books ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getBookByIsbn = (request, response) => {
  const isbn = parseInt(request.params.isbn)

  pool.query('SELECT * FROM Books WHERE isbn = $1', [isbn], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
 
const createBook = (request, response) => {
  
  const { title, authors, rating, coverPhoto, description, publishDate, publisher, genre, pages, isbn } = request.body

  pool.query('INSERT INTO Books (title, authors, rating, coverPhoto, description, publishDate, publisher, genre, pages, isbn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [title, authors, rating, coverPhoto, description, publishDate, publisher, genre, pages, isbn], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Book added : ${results}`)
  })
}

const updateBook = (request, response) => {
  const isbn = parseInt(request.params.id)
  const { title, authors, rating, coverPhoto, description, publishDate, publisher, genre, pages } = request.body

  pool.query(
    'UPDATE Books SET title = $1, authors = $2, rating = $3, coverPhoto = $4, description = $5, publishDate = $6, publisher = $7, genre = $8, pages = $9 WHERE isbn = $10',
    [title, authors, rating, coverPhoto, description, publishDate, publisher, genre, pages, isbn],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Book modified : ${isbn}`)
    }
  )
}


const deleteBook = (request, response) => {
  const isbn = parseInt(request.params.isbn)

  pool.query('DELETE FROM Books WHERE isbn = $1', [isbn], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Book deleted with ID: ${id}`)
  })
}

 


/* Queries for Current Shelf */
const createCurrentShelfBook = (request, response) => {
  const { username, isbn } = request.body

  pool.query('INSERT INTO CurrentShelf ( username, isbn) VALUES ($1, $2)', [ username, isbn], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`CurrentShelf added : ${results}`)
  })
}


const getCurrentShelfBook = (request, response) => {
  const username = parseInt(request.params.id)
  pool.query('SELECT * FROM CurrentShelf where username = $1 ORDER BY isbn ASC',[username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCurrentShelfBookId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM CurrentShelf WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/*
const updateCurrentShelfBook = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, isbn } = request.body

  pool.query(
    'UPDATE CurrentShelf SET username = $1, isbn = $2 WHERE id = $3',
    [username, isbn],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`CurrentShelf modified with ID: ${id}`)
    }
  )
}
*/

const deleteCurrentShelfBook = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM CurrentShelf WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`CurrentShelf deleted with ID: ${id}`)
  })
}




/* Queries for  Want To Read Shelf */

const createWantToReadShelfBook = (request, response) => {
  const { username, isbn } = request.body

  pool.query('INSERT INTO WantToReadShelf (username, isbn) VALUES ($1, $2)', [ username, isbn], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`WantToReadShelf added : ${results}`)
  })
}


const getWantToReadShelfBook = (request, response) => {
  const username = parseInt(request.params.id)
  pool.query('SELECT * FROM WantToReadShelf where username = $1 ORDER BY isbn ASC',[username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getWantToReadShelfBookId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM WantToReadShelf WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/*
const updateWantToReadShelfBook = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, isbn } = request.body

  pool.query(
    'UPDATE WantToReadShelf SET username = $1, isbn = $2 WHERE id = $3',
    [username, isbn],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`WantToReadShelf modified with ID: ${id}`)
    }
  )
}
*/

const deleteWantToReadShelfBook = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM WantToReadShelf WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`WantToReadShelf deleted with ID: ${id}`)
  })
}

/* Queries for Read Shelf  */

const createReadShelfBook = (request, response) => {
  const {username, isbn } = request.body

  pool.query('INSERT INTO ReadShelf (username, isbn) VALUES ($1, $2)', [username, isbn], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`ReadShelf added : ${results}`)
  })
}


const getReadShelfBook = (request, response) => {
  const username = parseInt(request.params.id)
  pool.query('SELECT * FROM ReadShelf where username = $1 ORDER BY isbn ASC',[username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getReadShelfBookId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM ReadShelf WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/*
const updateReadShelfBook = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, isbn } = request.body

  pool.query(
    'UPDATE ReadShelf SET username = $1, isbn = $2 WHERE id = $3',
    [username, isbn],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`ReadShelf modified with ID: ${id}`)
    }
  )
}
*/

const deleteReadShelfBook = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM ReadShelf WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`ReadShelf deleted with ID: ${id}`)
  })
}

/* Queries for Reviews */

const createReview = (request, response) => {
  const { username, isbn, content, date, rating } = request.body

  pool.query('INSERT INTO Reviews (username, isbn, content, date, rating ) VALUES ($1, $2, $3, $4, $5)', [username, isbn, content, date, rating ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Reviews added : ${results}`)
  })
}


const getReviewsForBook = (request, response) => {
  const isbn = parseInt(request.params.isbn)
  pool.query('SELECT * FROM Reviews where isbn = $1 ORDER BY date DESC',[isbn], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getReviewsByUser = (request, response) => {
  const username = parseInt(request.params.username)

  pool.query('SELECT * FROM Reviews WHERE username = $1 ORDER BY date DESC', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const updateReview = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, isbn, content, date, rating } = request.body

  pool.query(
    'UPDATE Reviews SET username = $1, isbn = $2, content = $3, date = $4, rating = $5  WHERE id = $6',
    [username, isbn, content, date, rating, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Reviews modified with ID: ${id}`)
    }
  )
}

const deleteReview = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Reviews deleted with ID: ${id}`)
  })
}



module.exports = {
  /*Users */
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,

  /*Books */
  getBookByIsbn,
  getBooks,
  createBook,
  updateBook,
  deleteBook,

  /*Reviews */
  getReviewsByUser,
  getReviewsForBook,
  createReview,
  updateReview,
  deleteReview,

  /*Read shelf */
  getReadShelfBook,
  getReadShelfBookId,
  createReadShelfBook,
  //updateReadShelfBook,
  deleteReadShelfBook,

  /*Want to Read shelf */
  getWantToReadShelfBook,
  getWantToReadShelfBookId,
  createWantToReadShelfBook,
  //updateWantToReadShelfBook,
  deleteWantToReadShelfBook,

  /*Current shelf */
  getCurrentShelfBook,
  getCurrentShelfBookId,
  createCurrentShelfBook,
  //updateCurrentShelfBook,
  deleteCurrentShelfBook

}