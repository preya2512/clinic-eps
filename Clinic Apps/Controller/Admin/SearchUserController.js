// Imports
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
const {Users} = require("../../Entity/Users.js")
const { reset } = require('nodemon')

class SearchUserController {

    // getUserByID
    getUserByID(UserID, callback) {

        let user = new Users();
        user.getUserByID(UserID, function(result){

            callback(result); 
        }); 

    }

    // Admin Get All User Account & Profile
    SearchUser(callback) {
        let user = new Users();

        user.SearchUser(function(result){

            callback(result); 
        }); 
    }

    findUser(req,res, callback) {
        
        let user = new Users(); 
        let strigifyFormData = JSON.stringify(req.body); 
        let parsedJSON = JSON.parse(strigifyFormData); 
        let value = parsedJSON.userInputForm;

        user.findUser(value, function(result) {
   
            return res.send(result);
        });
             
    }


}

exports.SearchUserController = SearchUserController;