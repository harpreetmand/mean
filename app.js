var express = require('express');
var app = express();
var path = require('path');

app.set('port', 3000);
//using middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/json', function(req, res){
    console.log("json");
    res
    .status(200)
    .json({"jsonData": true});
})

app.get('/file', function(req, res){
    console.log("file");
    res
    .status(200)
    .sendFile(path.join(__dirname, 'app.js'));
})

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log("The magic happens on port " + port);
});
