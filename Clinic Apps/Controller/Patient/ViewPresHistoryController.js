// Imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const { Prescription } = require('../../Entity/Prescription.js')

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);

class ViewPresHistoryController {

    // View Prescriptions History
    getPrescription(id, req, res, callback) {

        let prescription = new Prescription();
        console.log(req.session);

        prescription.getPrescriptionByUserID(id, function(result){

            return callback(result); 
        });           
    }
}

exports.ViewPresHistoryController = ViewPresHistoryController;
