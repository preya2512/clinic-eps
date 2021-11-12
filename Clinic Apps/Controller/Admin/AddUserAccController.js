// Imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Users} = require("../../Entity/Users.js")
const { reset } = require('nodemon')

class AddUserAccController {

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

}

exports.AddUserAccController = AddUserAccController;