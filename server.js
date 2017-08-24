const http = require("http");
const path = require("path");
const fs = require("fs");
let checkMimeType = true;
let port = process.env.npm_package_config_port || 80;

http.createServer(function (req, res) {
    let filename = req.url || "index.html";

    filename = filename === '/' ? "/index.html" : filename;

    let ext = path.extname(filename);
    let localPath = __dirname;
    let validExtensions = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".less": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".woff": "application/font-woff",
        ".woff2": "application/font-woff2",
        ".svg": "image/svg+xml"
    };

    let validMimeType = true;
    let mimeType = validExtensions[ext];

    if (checkMimeType) {
        validMimeType = validExtensions[ext] !== undefined;
    }

    if (validMimeType) {
        localPath += filename;
        fs.exists(localPath, function (exists) {
            if (exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, mimeType);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });

    } else {
        console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
    }

}).listen(port);

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function (err, contents) {
        if (!err) {
            res.setHeader("Content-Length", contents.length);
            if (mimeType !== undefined) {
                res.setHeader("Content-Type", mimeType);
            }
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

console.log("Starting web server at localhost:" + port);