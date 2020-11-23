const express = require("express");
const app = express();
const engine = require('ejs-locals')
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose')
const helmet = require('helmet')
const path = require('path')
const methodOverride = require('method-override')
const config = require('./config/config.js')

//const rootRouter = require('./routes/root.routes');
const userRouter = require('./routes/user.routes')
const bookRouter= require('./routes/book.routes')
const reviewRouter= require('./routes/review.routes')
const readShelfRouter= require('./routes/readshelf.routes')
const currentShelfRouter= require('./routes/currentshelf.routes')
const toReadShelfRouter= require('./routes/toreadshelf.routes')
const favouritesRouter= require('./routes/favourites.routes')

app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(__dirname + "/public/ElaAdmin"));
app.use(express.static(__dirname + "/public"));
//app.use(helmet())
app.engine('ejs', engine)
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
mongoose.connect(config.dbURI)

app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: true
    })
)

//app.use('/assets', express.static('assets'));


//app.use(session({ secret: "xu5lghxASUo7AvdacuvW", saveUninitialized: true, resave: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//app.use('/', rootRouter);
app.use('/user/', userRouter);
app.use('/book/', bookRouter);
app.use('/review/', reviewRouter);
app.use('/readshelf/', readShelfRouter);
app.use('/currentshelf/', currentShelfRouter);
app.use('/toreadshelf/', toReadShelfRouter);
app.use('/favourites/', favouritesRouter);

app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`)
})
