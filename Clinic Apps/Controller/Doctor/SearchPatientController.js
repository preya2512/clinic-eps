// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Patient} = require("../../Entity/Patient.js")

class SearchPatientController {

    // Search Patient
    SearchPatient(callback){

        let patient = new Patient();

        patient.SearchPatient(function(result){

            callback(result); 
        }); 
        
    }

    findPatient(req,res, callback) {
        
        let patient = new Patient(); 
        let strigifyFormData = JSON.stringify(req.body); 
        let parsedJSON = JSON.parse(strigifyFormData); 
        let value = parsedJSON.userInputForm;


        patient.findPatient(value, function(result) {

            return res.send(result);
        });
             
    }

}

exports.SearchPatientController = SearchPatientController;