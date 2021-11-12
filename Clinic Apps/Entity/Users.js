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

class Users {

    UserID;
    Username;
    password;
    Name;
    Email;
    role;

    constructor(userid,username,password,Name,email,role){
        this.UserID = userid;
        this.Username = username;
        this.password = password;
        this.Name = Name;
        this.Email = email;
        this.role = role;

    }

    getUserID() {
        return this.UserID;
    }

    setUserID(userid) {
        this.UserID = userid;
    }

    getUsername() {
        return this.Username;
    }

    setUsername(username) {
        this.Username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getName() {
        return this.Name;
    }

    setName(name) {
        this.Name = name;
    }

    getEmail() {
        return this.Email;
    }

    setEmail(email) {
        this.Email = email;
    }

    getRole() {
        return this.role;
    }

    setRole(role) {
        this.role = role;
    }

    getlogininfo(username, password, callback) {
        
        var sql = "SELECT * FROM Users Where Username = '" + username + 
            "' AND Password = '" + password + "'";
        var UserID;
        var dataRes;

        con.query(sql, function(err, results){
            if (err){ 
            throw err;
            
            }

            if(results.length>0) { //result is not empty

                UserID = results[0].UserID;  // Scope is larger than function
                dataRes = {
                    userid: results[0].UserID ,
                    username: results[0].Username,
                    name: results[0].Name,
                    role: results[0].Role
                }

                return callback(dataRes);
            } else {

                return callback(false);
            }
        })

    }

    boollogout() {

        this.UserID = "";
        this.Username = "";
        this.password = "";
        this.fname = "";
        this.lname = "";
        this.Email = "";
        this.role = "";

        return true;
    }

    CheckUsername(username, callback) {

        var sql = "SELECT * FROM USERS WHERE USERNAME = '" + username + "'";

        con.query(sql, function(err, results){
            if (err){ 
            throw err;
            
            }       
            
            if(results.length>0) {
                return callback(false);
            } 
            else {
                return callback(true);
            }
        })
    }

    AddUserAccount(username, password, name, email, callback) {

        var sql = "INSERT INTO Users (Username, Password, Name, Email) VALUES ('" + username + "',"
        + "'" + password + "', '" + name + "', '" + email + "')";

        con.query(sql, function(err, results){
            if (err){ 
            throw err;
            
            }       
            var dataRes = results;

            return callback(dataRes);
        })

    }

    AddUserProfile(id, role, callback) {

        var sql = "Update USERS SET Role = '" + role + "' WHERE UserID = '" + id + "';";

        con.query(sql, function(err, results){
            if (err){ 
            throw err;
            } 

            return callback(true);
        })
    }

    UpdateUserAccount(id, username, password, name, email, callback) {

        var sql = "Update USERS SET Username = '" + username + "', Password = '" + password + "', Name = '" + name + "', Email = '" + email + "' WHERE UserID = '" + id + "';";
 
        con.query(sql, function(err, results){
            if (err){ 
            throw err;
            } 
            
            return callback(true);
        })
    }

    UpdateUserProfile(id, role, callback) {

        var sql = "Update USERS SET Role = '" + role + "' WHERE UserID = '" + id + "';";
 
        con.query(sql, function(err, results){
            if (err){ 
            throw err;
            }     
            return callback(true);
        })
    }

    SearchUser (callback) {

        let sql = "SELECT * FROM USERS;";

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

    // Admin Search User Account & Profile
    findUser (value, callback) {

        let sql;

        if (value == 'Admin' || value == 'Patient' || value == 'Doctor' || value == 'Pharmacist') {

            sql = "SELECT * FROM USERS WHERE Role = '" + value +"'";

        }
        else {
            sql = "SELECT * FROM USERS WHERE Username LIKE '%" + value + 
                "%' OR Name LIKE '%" + value + "%' OR Role LIKE '" + value +"'";
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

    getUserByID(id, callback) {

        let sql = "SELECT * FROM USERS WHERE UserID = '" + id + "';";
        
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

exports.Users = Users