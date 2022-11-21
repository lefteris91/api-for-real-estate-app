const mongoose = require('mongoose');

const homesScema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    city: { type: String, required: true},
    price: { type:Number, required:true},
    squaremeters:{type:Number, required:true},
    homeImage:{type:String  },
    heating: {type: String},
    floor: {type: Number},
    adress: {type: String},
    rooms: {type: Number},
    contact: {type: String},
    year: {type: Number}
    
});

module.exports = mongoose.model('Home', homesScema);