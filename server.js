let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log('Starting server at localhost: ' + port);
});

app.use('/', express.static(__dirname + '/'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});