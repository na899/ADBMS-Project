const userRouter = require('express').Router()
const userController = require('../controllers/user.controller.js')

userRouter.get('/login', userController.showLogin)
userRouter.post('/login', userController.login)
userRouter.get('/logout', userController.checkLogin, userController.logout)
userRouter.get('/register',  userController.showRegister)
userRouter.post('/register', userController.register)
userRouter.post('/profile/:username', userController.showProfile)

module.exports = userRouter
