// Imports
const e = require('express');
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var mysql = require('mysql');
const {Users} = require("../Entity/Users.js")

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

class LogoutController {

    Logout(req, res) {

        let user = new Users(); 

        user.boollogout();
         
        req.session.destroy();
        res.redirect('/');     
    }  
}

exports.LogoutController = LogoutController;