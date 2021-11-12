
const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
var path = require("path");
const {ViewPrescriptionController} = require("../../Controller/Doctor/ViewPrescriptionController.js");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class DoctorViewPrescriptionUI {

    DisplayUI(req, res){

        let doctor_controller = new ViewPrescriptionController();

        var filePath = "./public/Doctor/Doctor_UpdatePrescription.ejs"
        var resolvedPath = path.resolve(filePath);
        console.log("resolvedPath:: " + resolvedPath);

        var userID = req.params.id;

        doctor_controller.getPrescriptionByUserID(userID, function(result) {

            res.render(resolvedPath, {
                data : result,  
                expressFlash: req.flash('message')
            });
         });
        
    }

}

exports.DoctorViewPrescriptionUI = DoctorViewPrescriptionUI;

//module.exports = AdminHomeUI;
