const { application } = require('express');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clinicapp"
});

con.connect();

class Prescription {

    PrescriptionID;
    PrescriptionName;
    PrescribedTo;
    Token;
    PrescriptionStatus;

    constructor() {

    }

    getPrescriptionID() {
        return this.PrescriptionID;
    }

    getPrescriptionName() {
        return this.PrescriptionName;
    }

    getPrescribedTo() {
        return this.PrescribedTo;
    }

    getToken() {
        return this.Token;
    }

    getPrescriptionStatus() {
        return this.PrescriptionStatus;
    }

    setPrescriptionID(_PrescriptionID) {
        this.PrescriptionID=_PrescriptionID;
    }

    setPrescriptionName(_PrescriptionName) {
        this.PrescriptionName = _PrescriptionName;
    }

    setPrescribedTo(_PrescribedTo) {
        this.PrescribedTo = _PrescribedTo;
    }

    setToken(_Token) {
        this.Token = _Token;
    }

    setPrescriptionStatus(_PrescriptionStatus) {
        PrescriptionStatus = _PrescriptionStatus;
    }

    AddPrescription(id, prescription, callback) {

        let sql = "INSERT INTO PRESCRIPTION (PrescriptionName, PrescribedTo, PrescriptionStatus) VALUES (?, ?, ?)";

        con.query(sql, [prescription, id, '0'],function(err, results){
            if (err){ 
            throw err;
            
            }       
            var dataRes = results;
            var prescId = results.insertId;
            var d = new Date();

            let sqltoken = "UPDATE PRESCRIPTION SET Token = ? WHERE PrescriptionID = '?'";
            let token = prescId + id + d.getDate() + (d.getMonth() + 1) + d.getFullYear();

            con.query(sqltoken, [token, prescId], function(err, results){
                if (err){ throw err; }

            });
            return callback(dataRes);
        })

    }

    getPrescriptionByUserID(id, callback) {

        let sql = "SELECT * FROM PRESCRIPTION WHERE PrescribedTo = '" + id + "'";

        con.query(sql, function(err, results){
            if (err){ 
            throw err;
            
            }       
            var dataRes = results;

            return callback(dataRes);
        })

    }

    UpdatePrescription(prescriptionid, prescriptionname, callback) {

        let sql = "Update Prescription SET PrescriptionName = '"+ prescriptionname + "' WHERE PrescriptionID = '" + prescriptionid + "'";

        //sql = "Update Prescription SET PrescriptionStatus = '1', DispensedOn = CURRENT_TIMESTAMP Where PrescriptionID = ?";

        con.query(sql,function(err, results){
            if (err){ 
            throw err;
            
            }       
            var dataRes = results;

            return callback(dataRes);
        })

    }

    // Enter Token (Retrieving)
    retrievePrescription(stringToken, callback) {

        let sql = 'SELECT * FROM PRESCRIPTION WHERE Token = ?';

        con.query(sql, [stringToken],function(err, results){
            if (err){ 
            throw err;
            
            }       
            var dataRes = results;

            return callback(dataRes);
        })

    }

    getPrescriptionByID (prescriptionid, callback) {

        let sql = 'SELECT * FROM PRESCRIPTION WHERE PrescriptionID = ?';

        con.query(sql, [prescriptionid],function(err, results){
            if (err){ 
            throw err;
            
            }       
            var dataRes = results;

            return callback(dataRes);
        })

    }

    updateStatus(presid, status, callback) {


        let sql;
        if(status == '0') {
            sql = "Update Prescription Set PrescriptionStatus = ?, DispensedOn = NULL Where PrescriptionID = ?";

        }
        else {
            sql = "Update Prescription Set PrescriptionStatus = ?, DispensedOn = current_timestamp() Where PrescriptionID = ?";

        }

        con.query(sql, [status, presid],function(err, results){
            if (err){ 
            throw err;
            
            }       
            var dataRes = results;

            return callback(true);
        })
    }

}

exports.Prescription = Prescription;