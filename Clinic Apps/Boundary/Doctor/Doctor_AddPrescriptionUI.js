
const express = require('express');
var router = express.Router();
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var path = require("path");
const {AddPrescriptionController} = require("../../Controller/Doctor/AddPrescriptionController.js");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class DoctorAddPrescriptionUI {

    DisplayUI(req, res){

        let doctor_controller = new AddPrescriptionController();

        var filePath = "./public/Doctor/Doctor_AddPrescription.ejs"
        var resolvedPath = path.resolve(filePath);
        console.log("resolvedPath:: " + resolvedPath);

        var userID = req.params.id;

        doctor_controller.getPatientByID(userID, function(result) {

            res.render(resolvedPath, {
                user : result,  
                expressFlash: req.flash('message')
            });
         });
        
    }

}

exports.DoctorAddPrescriptionUI = DoctorAddPrescriptionUI;

//module.exports = AdminHomeUI;
