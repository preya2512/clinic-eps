
const express = require('express');
var router = express.Router();
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var path = require("path");

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class AdminAddUserAccUI {

    DisplayAddUI(req, res){
        var path = require('path');
        var filePath = "./public/Admin/Admin_AddUserAccount.ejs"
        var resolvedPath = path.resolve(filePath);
        console.log("resolvedPath: " + resolvedPath);
        
        res.render(resolvedPath, {expressFlash: req.flash('message')});
    }

}

exports.AdminAddUserAccUI = AdminAddUserAccUI;

//module.exports = AdminAddUserAccUI;
