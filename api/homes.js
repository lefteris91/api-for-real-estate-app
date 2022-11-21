const express = require('express');
const router = express.Router();
const Home = require('../models/homemod');
const mongoose = require('mongoose');
const multer = require('multer');

// get  reqquests handling for /homes
router.get('/', (req, res , next)=>{
    Home.find()
    .select('city price _id squaremeters homeImage')
    .exec()
    .then(docs =>{
        const response ={
            homes: docs.map(doc =>{
                return{
                    city: doc.city,
                    price: doc.price,
                    _id: doc._id,
                    squaremeters: doc.squaremeters,
                    homeImage: doc.homeImage,
                    request:{
                        
                        url: 'http:localhost:3000/homes/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    })
});

// get a home with id from mongodb
    router.get("/:homesId",(req,res,next)=>{
        const id = req.params.homesId;
        Home.findById(id)
        .select('city price _id squaremeters heating floor adress rooms contact year homeImage')
        .exec()
        .then(doc =>{
            console.log(doc);
            if (doc){
                res.status(200).json(doc);  
            }else{
                res.status(404).json({
                    message: 'No entry found'
                })
            }
            
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error:err});
        })
    });
// 
// 
module.exports = router;