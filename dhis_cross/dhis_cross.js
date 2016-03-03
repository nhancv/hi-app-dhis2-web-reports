/**
 * Created by nhancao on 3/2/16.
 *
 * npm init
 * npm install express --save
 *
 * npm install body-parser --save
 * npm install request --save
 *
 */

var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
}).options('*', function (req, res, next) {
    res.end();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function (req, res) {
    var api_url = req.body.api_url;
    var user_name = req.body.user_name;
    var password = req.body.password;
    console.log("Api url = " + api_url + " User name = " + user_name + ", password = " + password);
    if (typeof(api_url) !== "undefined" && api_url
        && typeof(user_name) !== "undefined" && user_name
        && typeof(password) !== "undefined" && password) {
        requestTest(api_url, user_name, password, function (body) {
            if (body.indexOf("HTTP Status 401 - Bad credentials") > -1) {
                res.send("FAILED");
            } else {
                res.send(body);
            }
        }, function (err) {
            res.send("ERROR");
        });
    } else {
        res.send("FIELD_REQUIRED");
    }

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function requestTest(api_url, user_name, password, success, error) {
    var request = require('request');
    var username = user_name;
    var password = password;
    var options = {
        url: api_url,
        auth: {
            user: username,
            password: password
        }
    };

    request(options, function (err, res, body) {
        if (err) {
            error(err);
            return;
        }
        success(body);
        return;
    });
}


