/**
 * Created by zhoulanhong on 5/24/16.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var admin = require('./routes/index');
var sboss = require('./routes/sboss');


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/3rd', express.static(path.join(__dirname, 'bower_components')));

app.use('/admin', admin);
app.use('/sboss', sboss);

app.use(function (req, res, next) {
    console.log("------- 404 --------" + req.path);
    var err = new Error();
    err.status = 404;
    err.msg = "Not Found"
    //res.send("the page you want visit is not exist");
    next(err);
});

app.use(function (err, req, res, next) {
    //TODO  show all the error stack here
    console.log("---------- error ---------" + err.message);
    //res.status(err.status || 500);
    //res.send(err);
    if (!err.status) {
        err.status = 500;
        err.msg = "Server Inner Error";
    }
    res.send(err);
});

//TODO add log with log4js or others
app.listen(3000, function () {
    console.log("------ started success at port:" + 3000);
});