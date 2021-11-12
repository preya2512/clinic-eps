// Imports
const express = require('express')
const app = express();

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

const { reset } = require('nodemon');
const { Prescription } = require('../../Entity/Prescription');

class PharmacistController {

    VerifyToken(req, res, callback) {

        let prescription = new Prescription();

        
        let strigifyFormData = JSON.stringify(req.body); 
        let parsedJSON = JSON.parse(strigifyFormData); 
        let stringToken = parsedJSON.tokenString;

        console.log("String Token : ");
        console.log(stringToken);

        prescription.retrievePrescription(stringToken, function(result){

            return res.send(result);
        });

    }
    
    // Show Patient's Prescriptions
    getPrescriptionByID (prescriptionid, callback) {

        let prescription = new Prescription();

        prescription.getPrescriptionByID(prescriptionid, function(result){

            console.log("patient.getUserByID"); 
            callback(result); 

        }); 

    }

    updateStatus(req, res, callback) {

        let prescription = new Prescription();

        var presid = req.body.presciptionid;
        var status = req.body.prescriptionstatus;

        console.log("inside updateStatus controller");
        console.log("PresID: " + presid + " Status : " + status);

        prescription.updateStatus(presid, status, function(result) {
            
            req.flash('message', 'Prescription Status Updated!');
            res.redirect("/pharmacist/updatestatus/" + presid);
        })
    }

    
}

exports.PharmacistController = PharmacistController;