
const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
var path = require("path");
const {SearchUserController} = require("../../Controller/Admin/SearchUserController.js");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);

class AdminSearchUserUI {

    DisplaySearchUI(req, res){

        let admin_controller = new SearchUserController();

        var filePath = "./public/Admin/Admin_SearchUser.ejs"
        var resolvedPath = path.resolve(filePath);
        console.log("resolvedPath:: " + resolvedPath);

        admin_controller.SearchUser(function(result) {
            
            res.render(resolvedPath, {data : result});
        });
        
    }

}

exports.AdminSearchUserUI = AdminSearchUserUI;

//module.exports = AdminHomeUI;
