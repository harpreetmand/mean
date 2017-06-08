var express = require('express');
var router =  express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReviews = require('../controllers/reviews.controller.js');


router
    .route('/hotels')
    .get( ctrlHotels.hotelGetAll)
router
    .route('/hotels/:hotelId')
    .get( ctrlHotels.hotelGetOne)
router
    .route('/hotels/new')
    .post( ctrlHotels.hotelAddOne)

//review
router
    .route('/hotels/:hotelId/reviews')
    .get( ctrlReviews.reviewsGetAll)
router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get( ctrlReviews.reviewsGetOne)


module.exports = router;