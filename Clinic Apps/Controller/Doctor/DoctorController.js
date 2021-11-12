// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Patient} = require("../../Entity/Patient.js")
const {Prescription} = require("../../Entity/Prescription.js")

class DoctorController {

    // Search Patient
    SearchPatient(callback){

        let patient = new Patient();

        patient.SearchPatient(function(result){
            console.log("user.getAllinfo");
            callback(result); 
        }); 
        
    }

    findPatient(req,res, callback) {
        
        let patient = new Patient(); 
        let strigifyFormData = JSON.stringify(req.body); 
        let parsedJSON = JSON.parse(strigifyFormData); 
        let value = parsedJSON.userInputForm;

        console.log("find patient searchterm: " + value); 

        patient.findPatient(value, function(result) {
            console.log("inside doctor controller UI"); 
            console.log('send result:');    
            return res.send(result);
        });
             
    }

    getPatientByID(UserID, callback) {
        
        console.log("getUserByID(callback)");

        let patient = new Patient();
        patient.getUserByID(UserID, function(result){

            console.log("patient.getUserByID"); 
            callback(result); 

        });    
    }

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

    // Show Patient's Prescriptions
    getPrescriptionByUserID (userid, callback) {

        let prescription = new Prescription();

        prescription.getPrescriptionByUserID(userid, function(result){

            callback(result); 

        }); 

    }

    // Update Patient's Prescription
    UpdatePrescription (req, res) {

        console.log('update pres on controller..')

        var userid = req.body.userID;
        var presID = req.body.presciptionid;
        var prescriptionName = req.body.prescriptionName;

        console.log(userid + " " + presID + " " + prescriptionName);

        let prescription = new Prescription();

        prescription.UpdatePrescription(presID, prescriptionName, function(result) {

            req.flash('message', 'Prescription Updated!');
            res.redirect("/doctor/updateprescription/" + userid);
        })

    }
}

exports.DoctorController = DoctorController;