
const express = require('express');
const app = express()
var path = require("path");

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
const {VerifyTokenController} = require('../../Controller/Pharmacist/VerifyTokenController.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


class PharmacistEnterTokenUI {

    DisplayUI(req, res){

        let pharmacist_controller = new VerifyTokenController();

        var filePath = "./public/Pharmacist/Pharmacist_EnterToken.ejs"
        var resolvedPath = path.resolve(filePath);
        res.render(resolvedPath);

    }

}

exports.PharmacistEnterTokenUI = PharmacistEnterTokenUI;

//module.exports = AdminHomeUI;
