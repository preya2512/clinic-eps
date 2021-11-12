
const express = require('express');
var router = express.Router();
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var path = require("path");
const {AddUserProfileController} = require("../../Controller/Admin/AddUserProfileController.js");

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class AdminAddUserProfileUI {

    DisplayAddUI(req, res){

        let admin_controller = new AddUserProfileController();

        var path = require('path');
        var filePath = "./public/Admin/Admin_AddUserProfile.ejs"
        var resolvedPath = path.resolve(filePath);

        var userID = req.params.id;

        admin_controller.getUserByID(userID, function(result) {
               
            res.render(resolvedPath, {user : result});
        });

    }

}

exports.AdminAddUserProfileUI = AdminAddUserProfileUI;

//module.exports = AdminAddUserAccUI;
