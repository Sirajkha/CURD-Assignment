const express = require('express');

const {register,login,getUser} = require('../controllers/userControllers.js');
const jwtAuth = require('../middleware/jwtToken.js');

const userRoutes = express.Router();

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/user',jwtAuth, getUser)

module.exports = userRoutes;