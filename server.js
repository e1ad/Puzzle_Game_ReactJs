var express = require('express'),
    serveIndex = require('serve-index'),
    route = express();
    

route.use(express.static(__dirname));
route.use(express.static(__dirname + '/static'));
route.use('/', serveIndex('/static'))

var server = route.listen(3000, function() {
    var port = server.address().port
    console.log("run at http://127.0.0.1:" + port)
});





















