var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req,res){
    console.log(req.params.hotelId);
    var hotelId = req.params.hotelId;

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,data){
            res
                .status(200)
                .json(data.reviews);

        });
}

module.exports.reviewsGetOne = function(req,res){
    console.log(req.params.hotelId+ " - "+req.params.reviewId);
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,hotel){
            var review = hotel.reviews.id(reviewId)
            res
                .status(200)
                .json(review);

        });
}