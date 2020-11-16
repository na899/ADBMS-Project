const userRouter = require('express').Router()
const userController = require('../controllers/userController.js')

userRouter.get('/login', userController.showLogin)
userRouter.post('/login', userController.login)
userRouter.get('/logout', userController.checkLogin, userController.logout)
userRouter.get('/register',  userController.showRegister)
userRouter.post('/register', userController.register)

module.exports = userRouter