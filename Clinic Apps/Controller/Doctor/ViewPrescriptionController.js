// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Patient} = require("../../Entity/Patient.js")
const {Prescription} = require("../../Entity/Prescription.js")

class ViewPrescriptionController {

    // Show Patient's Prescriptions
    getPrescriptionByUserID (userid, callback) {

        let prescription = new Prescription();

        prescription.getPrescriptionByUserID(userid, function(result){

            callback(result); 
        }); 
    }

}

exports.ViewPrescriptionController = ViewPrescriptionController;