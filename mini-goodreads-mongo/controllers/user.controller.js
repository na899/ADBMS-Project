const { MD5 } = require('crypto-js')
const toReadShelfModel = require('../models/toReadShelf.model')
const userModel = require('../models/user.model')


showLogin = (req, res) => {
    res.render('login', { title: "Login" })
}

showRegister = (req, res) => {
    res.render('register', { title: "Register" })
}

logout = (req, res) => {
    req.session.destroy(function(){
    })
    res.direct(config.APP_BASE_URL + '/login')
}

checkLogin = (req, res) => {
    if(req.session.user) {
        next()
    } else
    {
        return res.redirect(config.APP_BASE_URL + '/login')
    }
}

login = async (req, res) => {
    if(req.body.username && req.body.password)
    {
        try {

            let res = await userModel.findOne({username: username})
            if(res == null) {
                res.status(400).jsonp({message: "User not found"})
            }
            let match = null
            if(MD5(password) == res.password)
                match = 1
            if (!match) {
                res.status(400).jsonp({message: "Password Mismatch"})
            }
            req.session.user = req.body            
            res.redirect(config.APP_BASE_URL)
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
        res.redirect(config.APP_BASE_URL)
    } catch(err)
    {
        console.log(err)
        res.status(500).render('error', { title: 'Error', error: 'Internal server error' })
    }
}

module.exports = {
    showLogin: showLogin,
    login: login,
    checkLogin: checkLogin,
    logout: logout,
    showRegister: showRegister,
    register: register
}