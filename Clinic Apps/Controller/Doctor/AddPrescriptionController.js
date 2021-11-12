// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Patient} = require("../../Entity/Patient.js")
const {Prescription} = require("../../Entity/Prescription.js")

class AddPrescriptionController {

    // Add Prescription
    AddPrescription(req, res) {

        var userid = req.body.userid;
        var prescriptionname = req.body.prescription;

        let prescription = new Prescription();

        prescription.AddPrescription(userid, prescriptionname, function(result) {

            console.log("Added! id = " + userid)
            req.flash('message', 'Prescription Added!');
            res.redirect("/doctor/addprescription/" + userid);
        })

    }

    getPatientByID(UserID, callback) {

        let patient = new Patient();
        patient.getUserByID(UserID, function(result){

            callback(result); 
        });    
    }

}

exports.AddPrescriptionController = AddPrescriptionController;