// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Patient} = require("../../Entity/Patient.js")
const {Prescription} = require("../../Entity/Prescription.js")
var nodemailer = require('nodemailer');
const QRCode = require("qrcode");

class SendEmailController {

    SendPrescription(req, res, callback) {

        let patient = new Patient();
        let prescription = new Prescription();

        let strigifyFormData = JSON.stringify(req.body); 
        let parsedJSON = JSON.parse(strigifyFormData); 
        let userid = parsedJSON.userID;
        let presid = parsedJSON.presID;

        console.log("INSIDE SENDPRESCRIPTION()")
        console.log("UserID = " + userid);
        console.log("PrescriptionID = " + presid);

        patient.getUserByID(userid, function(result){

            var Email = result[0].Email;
            var Name = result[0].Name;

            prescription.getPrescriptionByID(presid, async function(result) {

                console.log(result);
                var prescriptionID = result[0].PrescriptionID;
                var prescriptionName = result[0].PrescriptionName;
                var prescribedTo = result[0].PrescribedTo;
                var token = result[0].Token;
                var status;
                if(result[0].PrescriptionStatus == '0') {
                    status = 'Not Dispensed';
                }
                else {
                    status = 'Dispensed';
                }

                var prescribedOn = result[0].PrescribedOn;

                // Generate QR Code
                QRCode.toDataURL(token, function (err, qrtoken) {
                    if(err) return console.log("error occurred");

                    // Enter your own Gmail Account
                    var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: '',
                        pass: ''
                    }
                    });

                    var htmlstr = "<h1>Prescription</h1><h3>Prescription ID: " + prescriptionID + "</h3>" +
                    "<h3>Prescription Name: " + prescriptionName + "</h3>" +
                    "<h3>Prescribed To: " + Name + "</h3>" +
                    "<h3>Token: " + token + "</h3>" +
                    "<h3>Status: " + status + "</h3>" +
                    "<h3>Prescribed On: " + prescribedOn + "</h3>" +
                    "<img src= '" + qrtoken + "' alt='QR TOKEN'>"
    
                    var mailOptions = {
                        from: 'LunaSeekers',
                        to: Email,
                        subject: 'Prescription Details',
                        html: htmlstr               
                    };
    
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                    
                    return res.send(true);
                
                });                
            });
        });
    }

}

exports.SendEmailController = SendEmailController;