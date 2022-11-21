// tools and file declared
const express = require('express');
const app = express();
const morgan = require('morgan')
const homesRoutes = require('./api/homes');
const homeFilters = require('./api/filters');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://real-estate:5QcJN7eXIyYYWHKS@real-estate.l5gleuw.mongodb.net/?retryWrites=true&w=majority')
// 
// middle-w
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extented: true}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
// cors errors 
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'POST , GET');
        return res.status(200).json({});
    }
    next();
});
// 
// 
// routes
app.use('/homes', homesRoutes)
app.use('/filters',homeFilters)
// 
// handling errors
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});
// 

module.exports = app;