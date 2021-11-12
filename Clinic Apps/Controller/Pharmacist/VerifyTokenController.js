// Imports
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Prescription} = require("../../Entity/Prescription.js")

class VerifyTokenController {

    VerifyToken(req, res, callback) {

        let prescription = new Prescription();
      
        let strigifyFormData = JSON.stringify(req.body); 
        let parsedJSON = JSON.parse(strigifyFormData); 
        let stringToken = parsedJSON.tokenString;

        prescription.retrievePrescription(stringToken, function(result){

            return res.send(result);
        });

    }

}

exports.VerifyTokenController = VerifyTokenController;