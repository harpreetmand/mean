var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        required : true        
    },
    review : {
        type : String,
        required : true       
    },
    createdOn : {
        type : Date,
        "Default" : Date.now
    }
});

var roomSchema = new mongoose.Schema({
    type: String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});

var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : 1
    },
    stars : {
        type : Number,
        min : 0,
        max : 5,
        "default" : 0
    },
    services : [String],
    description : String,
    photos : [String],
    currency : String,
    reviews : [reviewSchema],
    rooms : [roomSchema],
    location : {
        address : String,
        // Always store cordinates in long lat format
        Coordinates : {
            type : [Number],
            index : '2dsphere'
        }
    }
});

mongoose.model("Hotel", hotelSchema, 'hotel');