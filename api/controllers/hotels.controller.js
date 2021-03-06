var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  // A geoJSON point
  var point = {
    type : "Point",
    coordinates : [lng, lat]
  };

  var geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };

  Hotel
    .geoNear(point, geoOptions, function(err, results, stats) {
      console.log('Geo errors', err);
      console.log('Geo Results', results);
      console.log('Geo stats', stats);
      res
        .status(200)
        .json(results);
    });

};

module.exports.hotelGetAll = function(req, res){    
    var offset = 0;
    var count = 5;

    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req, res);
        return;
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels){
            console.log("Found hotels", hotels.length)
            res
                .status(200)
                .json(hotels);
        });
};




module.exports.hotelGetOne = function(req, res){


    var hotelId = req.params.hotelId;

    Hotel
        .findById(hotelId)
        .exec(function(err, doc){
            res
                .status(200)
                .json( doc );
        
        });
};
    // collection
    //     .findOne({
    //             _id : ObjectId(hotelId)
    //     },function(err, doc){
    //         res
    //         .status(200)
    //         .json( doc );

    //     })
    // var thisHotel = hotelData[hotelId];
    // console.log("gettting one hotel", hotelId);

module.exports.hotelAddOne = function(req, res){
    var db = dbconn.get();
    var collection = db.collection('hotel');
    var newHotel;

    console.log("post new data");

    if(req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        newHotel.stars = parseInt(newHotel.stars,10);

        collection
            .insertOne(newHotel, function(err, response){
        console.log(response.ops);
        res
            .status(201)
            .json(response.ops);
                
            });
    
}else
    res
    .status(400)
    .json({message: "required data missing"});

}