// Imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Users} = require("../../Entity/Users.js")
const { reset } = require('nodemon')

class AdminController {

    // Admin Add User Account
    AddUserAccount(req, res){

        let user = new Users();

        var username = req.body.username;
        var name = req.body.name;
        var password = req.body.password;        
        var email = req.body.email;

        user.CheckUsername(username, function(result){

            if(!result){

                req.flash('message', 'Username Has Been Used!');
                res.redirect('/Admin_AddUserAccount');
            }
            else {
                
                user.AddUserAccount(username, password, name, email, function(result){
        
                    var id = result.insertId;
                    console.log("Added!")
        
                    res.redirect("/AddUserProfile/" + id);
                    
                });  
            }
        });     
    }

    // Admin Add User Profile
    AddUserProfile(req, res){
        console.log("add user profile controller");
        let user = new Users();

        var userID = req.body.userid;
        var role = req.body.roles;

        user.AddUserProfile(userID, role, function(result){
            console.log("Updated!");
            res.redirect("/AdminHome");
            
        });
        
    }

    // Admin Update User Account
    UpdateUserAccount(req, res) {

        console.log("update user account");

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

    // Admin Update User Profile
    UpdateUserProfile(req, res) {

        console.log("update user account");

        let user = new Users();

        var userID = req.body.userid;
        var role = req.body.roles;

        user.UpdateUserProfile(userID, role, function(result){
            console.log("Updated!");
            req.flash('message', 'User Profile Has Been Updated!');
            res.redirect("/admin/editprofile/" + userID);
            
        });

    }

    // getUserByID
    getUserByID(UserID, callback) {
        console.log("getUserByID(callback)");

        let user = new Users();
        user.getUserByID(UserID, function(result){
            console.log("user.getUserByID");
            callback(result); 

        }); 

    }

    // Admin Get All User Account & Profile
    SearchUser(callback) {
        let user = new Users();

        user.SearchUser(function(result){
            console.log("user.getAllinfo");
            callback(result); 
        }); 
    }

    findUser(req,res, callback) {
        
        let user = new Users(); 
        let strigifyFormData = JSON.stringify(req.body); 
        let parsedJSON = JSON.parse(strigifyFormData); 
        let value = parsedJSON.userInputForm;

        user.findUser(value, function(result) {
            console.log("inside admin controller UI"); 
            console.log('send result:');    
            return res.send(result);
        });
             
    }
    
}

exports.AdminController = AdminController;