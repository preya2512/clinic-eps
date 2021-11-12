// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Prescription} = require("../../Entity/Prescription.js")

class UpdateStatusController {

    // Show Patient's Prescriptions
    getPrescriptionByID (prescriptionid, callback) {

        let prescription = new Prescription();

        prescription.getPrescriptionByID(prescriptionid, function(result){


            callback(result); 
        }); 
    }

    updateStatus(req, res, callback) {

        let prescription = new Prescription();

        var presid = req.body.presciptionid;
        var status = req.body.prescriptionstatus;

        prescription.updateStatus(presid, status, function(result) {
            
            req.flash('message', 'Prescription Status Updated!');
            res.redirect("/pharmacist/updatestatus/" + presid);
        })
    }

}

exports.UpdateStatusController = UpdateStatusController;