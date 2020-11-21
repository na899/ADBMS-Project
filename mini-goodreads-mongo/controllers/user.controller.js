const { MD5 } = require('crypto-js')
const reviewModel = require('../models/review.model')
const userModel = require('../models/user.model')
const config = require('../config/config.js')
const bookModel = require('../models/book.model')


showLogin = (req, res) => {
    res.render('login', { title: "Login" })
}

showRegister = (req, res) => {
    res.render('register', { title: "Register" })
}

logout = (req, res) => {
    req.session.destroy(function(){
    })
    res.redirect(config.APP_BASE_URL + '/user/login')
}

checkLogin = (req, res) => {
    if(req.session.user) {
        next()
    } else
    {
        return res.redirect(config.APP_BASE_URL + '/user/login')
    }
}

login = async (req, res) => {
    console.log(req.body.username);
    if(req.body.username && req.body.password)
    {
        try {

            let result = await userModel.findOne({username: req.body.username})
            if(result == null) {
                res.status(400).jsonp({message: "User not found"})
            }
            let match = null
            if(MD5(req.body.password) == result.password)
                match = 1
            if (!match) {
                res.status(400).jsonp({message: "Password Mismatch"})
            }
            req.session.user = req.body
            res.redirect(config.APP_BASE_URL + '/book')
        } catch(err)
        {
            console.log(err)
            res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
        }
    }
}

register = async (req, res) => {
    try {
        const newUser = await userModel.create({
            username: req.body.username,
            password: MD5(req.body.password),
            name: req.body.name,
            email: req.body.email,
            profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQeaUoawZR3nca9VClt8XQO38BxMqdRVOsfgzjYaLgzbJxjh",
            session: null
        })
        res.redirect(config.APP_BASE_URL + '/book')
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

showProfile = async (req, res) => {
    try {
        const profileData = await userModel.findOne({username: req.params.username}).exec()
        const reviewData = await reviewModel.find({username: req.params.username}).exec()
        const bookData = await bookModel.find({}).exec()
        console.log(bookData)
        let bookDictionary = {}
        for (let book in bookData)
        {
            bookDictionary[book.isbn] = book.title
        }
        console.log(bookDictionary)
        res.render('profile', { 
            profileData: profileData,
            reviewData: reviewData,
            bookDictionary: bookDictionary,
            title: "User Profile"
        })
        
    } catch(err)
    {
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

module.exports = {
    showLogin: showLogin,
    login: login,
    checkLogin: checkLogin,
    logout: logout,
    showRegister: showRegister,
    register: register,
    showProfile: showProfile
}