var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanHotels';

var _connection = null;

var open = function(){
    MongoClient.connect(dburl, function(err, db){
        if (err){
            console.log("Db connection failed");
        }
        _connection = db;
        console.log("DB connection open", db)
    });
};

var get = function(){
    return _connection;
};

module.exports = {
    open : open,
    get : get
};