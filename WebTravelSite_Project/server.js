'use strict';
const http = require('http');
const port = process.env.PORT || 1337;
const url = require("url");
const fs = require("fs");
//req is request, the thing we listen for
//res is response, the thing we write to
/*
req.url returns:
/Destinations.html
/Destinations.css
/Destinations.js
/ favicon.ico
*/
let server = http.createServer(function (req, res) {
    console.log(req.url);
    //URL path
    let path = url.parse(req.url).pathname;
    //IF .html is in url then look at path and retrieve file that matches path name
    if (req.url.indexOf('.html') != -1) {
        fs.readFile(__dirname + '/' + path, function (error, data) {
            //If error is returned then write 404 and print out error message in command promp(Where we start server)
            if (error) {
                res.writeHead(404);
                res.write(error);
                res.end();
            } else {
                //Writes the html content to the page
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    }
    //If .css file is linked in .html file we will see which file we have and load the correct style sheet
    if (req.url.indexOf('.css') != -1) {
        let temp = path.split('.');
        let newPath = ('/' + temp[0] + '.css');
        fs.readFile(__dirname + newPath, function (error, data) {
            //If error is returned then write 404 and print out error message in command promp(Where we start server)
            if (error) {
                res.writeHead(404);
                res.write(error);
                res.end();
            } else {
                //Writes the CSS to the page
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data);
                res.end();
            }
        });
    }
    //If .js file is linked in html file then load the correct one
    if (req.url.indexOf('.js') != -1) {
        let temp = path.split('.');
        let newPath = ('/' + temp[0] + '.js');
        fs.readFile(__dirname + newPath, function (error, data) {
            //If error is returned then write 404 and print out error message in command promp(Where we start server)
            if (error) {
                res.writeHead(404);
                res.write(error);
                res.end();
            } else {
                //Writes the javascript to the page
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.write(data);
                res.end();
            }
        });
    }
    if (req.url.indexOf('.png') != -1) {
        //let temp = (req.url.indexOf('.png')).split('.');
        let newPath = ('/' + 'nothing');
        fs.readFile(__dirname + newPath, function (error, data) {
            //If error is returned then write 404 and print out error message in command promp(Where we start server)
            if (error) {
                res.writeHead(404);
                res.write(error);
                res.end();
            } else {
                //Writes the javascript to the page
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            }
        });
    }
});
//Continues to listen for further connections
server.listen(port);