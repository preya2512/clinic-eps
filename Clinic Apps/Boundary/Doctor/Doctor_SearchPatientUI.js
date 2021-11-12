
const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
var path = require("path");
const {SearchPatientController} = require("../../Controller/Doctor/SearchPatientController.js");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class DoctorSearchPatientUI {

    DisplaySearchUI(req, res){

        let doctor_controller = new SearchPatientController();

        var filePath = "./public/Doctor/Doctor_SearchPatient.ejs"
        var resolvedPath = path.resolve(filePath);

        doctor_controller.SearchPatient(function(result) {

            res.render(resolvedPath, {data : result});
        });
        
    }

}

exports.DoctorSearchPatientUI = DoctorSearchPatientUI;

//module.exports = AdminHomeUI;
