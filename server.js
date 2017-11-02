let express = require('express');
let path = require('path');
let app = express();
let port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log('Starting server at localhost: ' + port);
});

app.use('/', express.static(__dirname + '/public'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname + '/public')});
});
