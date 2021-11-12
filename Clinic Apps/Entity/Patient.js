const { application } = require('express');
const util = require('util');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clinicapp"
});

con.connect();

const {Users} = require("../Entity/Users.js")

class Patient extends Users {

    constructor() {
        super();
    }

    SearchPatient (callback) {
        let sql = "SELECT * FROM USERS WHERE Role = 'Patient';";

        con.query(sql, function(err, results){
            if (err){throw err;}

        var dataRes;

        if(results.length>0) { //result is not empty

            dataRes = results;

            return callback(dataRes);

            } else {

                return callback(false);
            }
        })

    }

    findPatient(value, callback) {

        let sql;

        if(value == '' || value == ' ') {
            sql = "SELECT * FROM USERS WHERE Role = 'Patient'";

        } else {
            sql = "SELECT * FROM USERS WHERE Role = 'Patient' AND Name LIKE '%" + value + "%';";
        }

        con.query(sql, function(err, results){
            if (err){ 
                throw err;       
            }

            var dataRes;

            if(results.length>0) { //result is not empty
                dataRes = results;

                return callback(dataRes);

            } 
            else {

                return callback(false);
            }
        })

    }

    
}

exports.Patient = Patient;