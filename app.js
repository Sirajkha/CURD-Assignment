const express = require('express');
const cors = require('cors');
const connectDb = require('./config/dbConfig.js');
const userRoutes = require('./router/userRoutes.js');
const cookieParser = require('cookie-parser');

const app = express();

//connect database
connectDb();

app.use(express.json());// built-in meddleware 
app.use(cookieParser());// third party meddleware

// auth routes
app.use('/api/auth',userRoutes);

app.use('/',(req,res) =>{
res.status(200).json({
    data:"Auth server is updated"
})
})


module.exports = app;