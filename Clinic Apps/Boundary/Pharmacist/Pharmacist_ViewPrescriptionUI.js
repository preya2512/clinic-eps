
const express = require('express');
var router = express.Router();
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var path = require("path");
const {UpdateStatusController} = require("../../Controller/Pharmacist/UpdateStatusController.js");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class PharmacistViewPrescriptionUI {

    DisplayUI(req, res){

        let pharma_controller = new UpdateStatusController();

        var filePath = "./public/Pharmacist/Pharmacist_ViewPrescription.ejs"
        var resolvedPath = path.resolve(filePath);
        console.log("resolvedPath:: " + resolvedPath);

        var userID = req.params.id;

        pharma_controller.getPrescriptionByID(userID, function(result) {

            res.render(resolvedPath, {
                data : result,  
                expressFlash: req.flash('message')
            });
         });
        
    }

}

exports.PharmacistViewPrescriptionUI = PharmacistViewPrescriptionUI;

//module.exports = AdminHomeUI;
