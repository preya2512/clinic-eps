// Imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var mysql = require('mysql');

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);

const sessions = require('express-session');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Users} = require("../Entity/Users.js");

class LoginController {

    ValidateLogin(req, res) {
        
        let user = new Users(); 

        var dataRes;

        var username = req.body.username
        var password = req.body.password

        console.log(username + " " + password);

        user.getlogininfo(username, password, function(result){

            if(result){ 
                dataRes = result;

                var session;

                // Login endpoint
                session=req.session;
                session.userid=dataRes.userid;
                session.username = dataRes.username;
                session.name = dataRes.name;
                session.userrole=dataRes.role;
                        
                
                if(dataRes.role == "Doctor") {
                    console.log("Called doctor home");
                    res.redirect("/DoctorHome");
                }
                else if(dataRes.role == "Admin") {
                    console.log("Called admin home");
                    res.redirect('/AdminHome');
                }
                else if(dataRes.role == "Pharmacist") {
                    console.log("Called Pharmacist home");
                    res.redirect('/PharmacistHome');
                }
                else if(dataRes.role == "Patient") {
                    console.log("Called Patient home");
                    res.redirect('/PatientHome');
                }
                
            }
            else {

                req.flash('message', 'Wrong Username or Password!')
                res.redirect("/?error=true");
                return false;

            }
        });
        
    }
    
}

//module.exports = LoginController;
exports.LoginController = LoginController;