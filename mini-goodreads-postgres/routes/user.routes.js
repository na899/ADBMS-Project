const userRouter = require('express').Router()
const userController = require('../db/user')

userRouter.get('/login', userController.showLogin)
userRouter.post('/login', userController.login)
userRouter.get('/logout',  userController.logout)
userRouter.get('/register',  userController.showRegister)
userRouter.post('/register', userController.register)
userRouter.post('/profile/:username', userController.showProfile)

module.exports = userRouter
