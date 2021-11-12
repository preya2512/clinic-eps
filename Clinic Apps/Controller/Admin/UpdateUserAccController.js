// Imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Users} = require("../../Entity/Users.js")
const { reset } = require('nodemon')

class UpdateUserAccController {

    // getUserByID
    getUserByID(UserID, callback) {

        let user = new Users();
        user.getUserByID(UserID, function(result){

            callback(result); 
        }); 
    }

    // Admin Update User Account
    UpdateUserAccount(req, res) {

        let user = new Users();

        var userID = req.body.userid;
        var username = req.body.username;
        var password = req.body.password;
        var name = req.body.name;
        var email = req.body.email;

        user.UpdateUserAccount(userID, username, password, name, email, function(result){
            console.log("Updated!");
            req.flash('message', 'User Account Has Been Updated!');
            res.redirect("/admin/editaccount/" + userID);
            
        });

    }
    
        

}

exports.UpdateUserAccController = UpdateUserAccController;