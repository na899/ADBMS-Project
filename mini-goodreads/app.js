const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const db = require('./postgresql-db/pg')

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)



app.get('/books', db.getBooks)
app.get('/books/:isbn', db.getBookByIsbn)
app.post('/books', db.createBook)
app.put('/books/:isbn', db. updateBook)
app.delete('/books/:isbn', db.deleteBook)

app.get('/reviews/:username', db.getReviewsByUser)
app.get('/reviews/:isbn', db. getReviewsForBook)
app.post('/reviews', db.createReview)
app.put('/reviews/:id', db.updateReview)
app.delete('/reviews/:id', db.deleteReview)

app.get('/readShelf/:username', db. getReadShelfBook)
app.get('/readShelf/:id', db.getReadShelfBookId)
app.post('/readShelf', db.createReadShelfBook)
//app.put('/readShelf/:id', db.updateReadShelfBook)
app.delete('/readShelf/:id', db.deleteReadShelfBook)

app.get('/wantToReadShelf/:username', db.getWantToReadShelfBook)
app.get('/wantToReadShelf/:id', db.getWantToReadShelfBookId)
app.post('/wantToReadShelf', db. createWantToReadShelfBook)
//app.put('/wantToReadShelf/:id', db.updateWantToReadShelfBook)
app.delete('/wantToReadShelf/:id', db.deleteWantToReadShelfBook)


app.get('/currentShelf/:username', db.getCurrentShelfBook)
app.get('/currentShelf/:id', db.getCurrentShelfBookId)
app.post('/currentShelf', db.createCurrentShelfBook)
//app.put('/currentShelf/:id', db.updateCurrentShelfBook)
app.delete('/currentShelf/:id', db.deleteCurrentShelfBook)

