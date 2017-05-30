var express = require('express');
var router =  express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');


router
    .route('/hotels')
    .get( ctrlHotels.hotelGetAll)
router
    .route('/hotels/:hotelId')
    .get( ctrlHotels.hotelGetOne)
router
    .route('/hotels/new')
    .post( ctrlHotels.hotelAddOne)

module.exports = router;