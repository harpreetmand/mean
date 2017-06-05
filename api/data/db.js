var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanHotels';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
    console.log('mongoose connected to ' + dburl)
});
mongoose.connection.on('disconnected', function(){
    console.log('mongoose disconnected')
});

mongoose.connection.on('error', function(err){
    console.log('mongoose connected error ' + err)
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('connection closed');
        process.exit(0);
    });
});
process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log('connection closed');
        process.exit(0);
    });
});
process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        console.log('connection closed');
        process.kill(process.pid, 'SIGUSR2');
    });
});

require('./hotels.model.js')