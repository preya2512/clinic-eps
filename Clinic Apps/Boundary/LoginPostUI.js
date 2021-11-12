const {LoginController} = require("../Controller/LoginController.js");

const express = require('express');
var router = express.Router();
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var path = require("path");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class LoginPostUI  {

    DisplayLogin(req, res) {
        var path = require('path');
        var filePath = "./public/LoginPage.ejs"
        var resolvedPath = path.resolve(filePath);
        console.log("resolvedPath: " + resolvedPath);
        res.render(resolvedPath,
            {expressFlash: req.flash('message')});

    } 

    LoadAdminHome(req, res) {
      
        var path = require('path');
        var filePath = "./public/Admin/AdminHome.ejs"
        var resolvedPath = path.resolve(filePath);

        res.render(resolvedPath);
    }

    LoadDoctorHome(req, res) {
      
        var path = require('path');
        var filePath = "./public/Doctor/DoctorHome.ejs"
        var resolvedPath = path.resolve(filePath);

        res.render(resolvedPath);
    }

    LoadPatientHome(req, res) {
      
        var path = require('path');
        var filePath = "./public/Patient/PatientHome.ejs"
        var resolvedPath = path.resolve(filePath);

        res.render(resolvedPath);
    }

    LoadPharmacistHome(req, res) {
      
        var path = require('path');
        var filePath = "./public/Pharmacist/PharmacistHome.ejs"
        var resolvedPath = path.resolve(filePath);

        res.render(resolvedPath);
    }
    
}
//module.exports = LoginPostUI;
exports.LoginPostUI = LoginPostUI;
