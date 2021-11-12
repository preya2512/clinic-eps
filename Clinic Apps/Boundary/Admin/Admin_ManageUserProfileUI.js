
const express = require('express');
var router = express.Router();
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var path = require("path");
const {UpdateUserProfileController} = require("../../Controller/Admin/UpdateUserProfileController.js");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class AdminManageUserProfileUI {

    DisplayUI(req, res){

        let admin_controller = new UpdateUserProfileController();

        var path = require('path');
        var filePath = "./public/Admin/Admin_ViewUserProfile.ejs"
        var resolvedPath = path.resolve(filePath);
        console.log("resolvedPath:: " + resolvedPath);

        var userID = req.params.id;

        admin_controller.getUserByID(userID, function(result) {   
            res.render(resolvedPath, {
                user : result,  
                expressFlash: req.flash('message')
            });
         });
        
    }

}

exports.AdminManageUserProfileUI = AdminManageUserProfileUI;

//module.exports = AdminHomeUI;
