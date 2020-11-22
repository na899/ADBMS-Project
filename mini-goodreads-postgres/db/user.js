const config = require('../config/config.js')
const { MD5 } = require('crypto-js')
const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})



const showLogin = (req, res) => {
    res.render('login', { title: "Login" })
}

const showRegister = (req, res) => {
    res.render('register', { title: "Register" })
}

const logout = (req, res) => {
    req.session.destroy(function(){
    })
    res.redirect(config.APP_BASE_URL + '/user/login')
}

const checkLogin = (req, res) => {
    if(req.session.user) {
        next()
    } else
    {
        return res.redirect(config.APP_BASE_URL + '/user/login')
    }
}


const login = async (req, res) => {
  console.log(req.body.username);
  if(req.body.username && req.body.password)
  {
      try {

          pool.query('SELECT * FROM Users WHERE username = $1', [req.body.username], (error, results) => {
            if (error) {
              throw error
            }
            let result = results.rows[0]
            if(result == undefined) {
                res.status(400).jsonp({message: "User not found"})
            }
            else{
              let match = null
             
              if(JSON.stringify(JSON.parse(result.password)) == JSON.stringify(MD5(req.body.password)))
                match = 1
              if (!match) {
                res.status(400).jsonp({message: "Password Mismatch"})
              }
              else{
                req.session.user = req.body
                res.redirect(config.APP_BASE_URL + '/book')
              }
              
            }

          })
      } catch(err)
      {
          console.log(err)
          res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
      }
  }
}

const register = async (req, res) => {
  try {
    const { username, password, name, email, profilePhoto, joinDate, isAdmin, session } = req.body

    pool.query('INSERT INTO Users (username, password, name, email, profilePhoto, joinDate, isAdmin, session) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [username, MD5(password), name, email, profilePhoto, joinDate, isAdmin, session], (error, results) => {
      if (error) {
        throw error
      }
      
    })

      res.redirect(config.APP_BASE_URL)
  } catch(err)
  {
      console.log(err)
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}



const showProfile = async (req, res) => {
  try {

    const username = parseInt(req.params.username)

    pool.query('SELECT * FROM Users WHERE username = $1', [username], (error, results) => {
      if (error) {
        throw error
      }
      const profileData = results.rows[0]
      pool.query('SELECT * FROM Reviews WHERE username = $1 ORDER BY date DESC', [username], (error, result) => {
        if (error) {
          throw error
        }
        const reviewData = result.rows
        pool.query('SELECT * FROM Books ORDER BY title ASC', (error, books) => {
          if (error) {
            throw error
          }
          const bookData = books.rows
          console.log(bookData)
          let bookDictionary = {}
          for (let book in bookData){
              bookDictionary[book.isbn] = book.title
          }
          console.log(bookDictionary)
          
          res.render('profile', {
            profileData: profileData,
            reviewData: reviewData,
            bookDictionary: bookDictionary,
            title: "User Profile"
          })
          
        })
      })
    })
      
      
  } catch(err)
  {
      res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
  }
}

const getUsers = (req, res) => {
  pool.query('SELECT * FROM Users ORDER BY username ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}


const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE Users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM Users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}


module.exports = {
    /*Users */
    getUsers,
    showProfile,
    login,
    checkLogin,
    showLogin,
    register,
    showRegister,
    updateUser,
    deleteUser,
    logout
}  