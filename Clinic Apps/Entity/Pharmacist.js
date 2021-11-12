const { application } = require('express');
const util = require('util');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clinicapp"
});

const {Users} = require("../Entity/Users.js")

class Pharmacist extends Users {

    constructor() {
        super();
    }

    

}

exports.Pharmacist = Pharmacist;