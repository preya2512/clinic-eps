// Imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Users} = require("../../Entity/Users.js")
const { reset } = require('nodemon')

class UpdateUserProfileController {

    // getUserByID
    getUserByID(UserID, callback) {

        let user = new Users();
        user.getUserByID(UserID, function(result){

            callback(result); 
        }); 

    }

    // Admin Update User Profile
    UpdateUserProfile(req, res) {

        let user = new Users();

        var userID = req.body.userid;
        var role = req.body.roles;

        user.UpdateUserProfile(userID, role, function(result){
            console.log("Updated!");
            req.flash('message', 'User Profile Has Been Updated!');
            res.redirect("/admin/editprofile/" + userID);
            
        });

    }

}

exports.UpdateUserProfileController = UpdateUserProfileController;