const express = require('express');
const router = express.Router();
const Home = require('../models/homemod');
const mongoose = require('mongoose');
const { request, response } = require('../app');
const url = require('url');
//4 filtra poli timh tetragwnika thermansh
router.get('/',(req,res,next)=>{
    
    const pass = url.parse(req.url,true).query;          
    let query = {};                                 //me to pass pernoume to url kai vazontas mia keni metavliti (query)
    if (pass.city){                                 // tsekaroume mono ta stoixeia pou exei eisagei o xrhsths
        query.city = pass.city;
    }
    if (pass.heating){
        query.heating = pass.heating;
    }
    if(pass.price){
        query.price = {$lte: pass.price}
    }
    if(pass.squaremeters){
        query.squaremeters = {$lte: pass.squaremeters}
    }
    
     Home.find(query) 
        .select('city price _id squaremeters homeImage ')                                          
        .exec()
        .then(doc =>{
            
            if (doc.length != 0){
                const response = {
                    homes: doc.map(doc =>{
                        return{
                            city:doc.city,
                            price: doc.price,
                            _id: doc._id,
                            squaremeters:doc.squaremeters,
                            homeImage: doc.homeImage,
                            request:{
                                url: 'http:localhost:3000/homes/' + doc._id
                            }
                        }
                    })
                }
                res.status(200).json(response)
            }else  {
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

module.exports = router;