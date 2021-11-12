
const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
var path = require("path");
const {ViewPresHistoryController} = require("../../Controller/Patient/ViewPresHistoryController.js");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);

class PatientViewPrescriptionUI {

    DisplayUI(req, res, callback){

        let patient_controller = new ViewPresHistoryController();

        var id = req.session.userid;

        var filePath = "./public/Patient/Patient_ViewPrescription.ejs"
        var resolvedPath = path.resolve(filePath);

        patient_controller.getPrescription(id, req, res, function(result) {
    
            res.render(resolvedPath, {data : result});
        });
        
        
    }

}

exports.PatientViewPrescriptionUI = PatientViewPrescriptionUI;

