// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Patient} = require("../../Entity/Patient.js")
const {Prescription} = require("../../Entity/Prescription.js")

class UpdatePrescriptionController {

    // Show Patient's Prescriptions
    getPrescriptionByUserID (userid, callback) {

        let prescription = new Prescription();

        prescription.getPrescriptionByUserID(userid, function(result){

            callback(result); 
        }); 

    }

    // Update Patient's Prescription
    UpdatePrescription (req, res) {

        var userid = req.body.userID;
        var presID = req.body.presciptionid;
        var prescriptionName = req.body.prescriptionName;

        let prescription = new Prescription();

        prescription.UpdatePrescription(presID, prescriptionName, function(result) {

            req.flash('message', 'Prescription Updated!');
            res.redirect("/doctor/updateprescription/" + userid);
        })

    }
}

exports.UpdatePrescriptionController = UpdatePrescriptionController;