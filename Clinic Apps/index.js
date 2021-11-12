// Imports
const express = require('express')
var router = express.Router();
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000;
var path = require("path");

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var nodemailer = require('nodemailer');

const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(function(req, res, next) {

    res.locals.sessUserID = req.session.userid;
    res.locals.username = req.session.username;
    res.locals.name = req.session.name;
    res.locals.sessRole = req.session.userrole;
    next();
});

var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser'); // ES5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);

var flash = require('connect-flash');

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use(flash());


/* check if got session */
var checkAuth = function (req, res, next) {
    sess=req.session;
    console.log(sess);
    if(sess.userid) {
       
        console.log('LOGGED')
        next();
    } else {
        res.redirect("/");
    }
    
  }

// Import All Boundary Classes //
const {LoginPostUI} = require("./Boundary/LoginPostUI.js")

/***** Admin ******/
const {AdminAddUserAccUI} = require("./Boundary/Admin/Admin_AddUserAccUI.js")
const {AdminAddUserProfileUI} = require("./Boundary/Admin/Admin_AddUserProfileUI.js")
const {AdminSearchUserUI} = require("./Boundary/Admin/Admin_SearchUserUI.js")
const {AdminManageUserAccUI } = require('./Boundary/Admin/Admin_ManageUserAccUI.js');
const {AdminManageUserProfileUI } = require('./Boundary/Admin/Admin_ManageUserProfileUI.js');

/***** Doctor ******/
const {DoctorSearchPatientUI} = require("./Boundary/Doctor/Doctor_SearchPatientUI.js")
const {DoctorAddPrescriptionUI} = require("./Boundary/Doctor/Doctor_AddPrescriptionUI.js")
const {DoctorViewPrescriptionUI} = require("./Boundary/Doctor/Doctor_ViewPrescriptionUI.js")

/***** Patient ******/
const {PatientViewPrescriptionUI} = require("./Boundary/Patient/Patient_ViewPrescriptionUI.js");

/***** Pharmacist *****/
const {PharmacistEnterTokenUI} = require("./Boundary/Pharmacist/Pharmacist_EnterTokenUI.js");
const {PharmacistViewPrescriptionUI} = require('./Boundary/Pharmacist/Pharmacist_ViewPrescriptionUI.js');

// Import All Controller Classes
const {LoginController} = require("./Controller/LoginController.js");
const {LogoutController} = require("./Controller/LogoutController.js");
const {AdminController} = require("./Controller/Admin/AdminController.js");
const {DoctorController} = require('./Controller/Doctor/DoctorController.js');
//const {PatientController} = require('./Controller/Patient/ViewPresHistoryController.js');
const {PharmacistController} = require('./Controller/Pharmacist/PharmacistController.js');

/***** Admin *******/
const {AddUserAccController} = require("./Controller/Admin/AddUserAccController.js");
const {AddUserProfileController} = require("./Controller/Admin/AddUserProfileController.js");
const {SearchUserController} = require("./Controller/Admin/SearchUserController.js");
const {UpdateUserAccController} = require("./Controller/Admin/UpdateUserAccController.js");
const {UpdateUserProfileController} = require("./Controller/Admin/UpdateUserProfileController.js");

/***** Doctor ******/
const {AddPrescriptionController} = require("./Controller/Doctor/AddPrescriptionController.js")
const {SearchPatientController} = require("./Controller/Doctor/SearchPatientController.js")
const {UpdatePrescriptionController} = require("./Controller/Doctor/UpdatePrescriptionController.js")
const {ViewPrescriptionController} = require("./Controller/Doctor/ViewPrescriptionController.js")
const {SendEmailController} = require("./Controller/Doctor/SendEmailController.js")

/***** Patient ******/
const {ViewPresHistoryController} = require("./Controller/Patient/ViewPresHistoryController.js");


/***** Pharmacist ******/
const {VerifyTokenController} = require("./Controller/Pharmacist/VerifyTokenController.js");
const {UpdateStatusController} = require("./Controller/Pharmacist/UpdateStatusController.js");

// Login & Logout Boundary
let login_boundary = new LoginPostUI();

/**** Admin Boundary *******/ 
let adminAddAcc_boundary = new AdminAddUserAccUI();
let adminAddProfile_boundary= new AdminAddUserProfileUI();
let adminSearchUser_boundary = new AdminSearchUserUI();
let adminManageAcc_boundary = new AdminManageUserAccUI();
let adminManageProfile_boundary = new AdminManageUserProfileUI();   

/**** Doctor Boundary *******/ 
let doctorSearchPatient_boundary = new DoctorSearchPatientUI();
let doctorAddPrescription_boundary = new DoctorAddPrescriptionUI();
let doctorViewPrescription_boundary = new DoctorViewPrescriptionUI();

/**** Patient Boundary *****/
let patientViewPrescription_boundary = new PatientViewPrescriptionUI();

/**** Pharmacist Boundary *****/
let pharmacistEnterToken_boundary = new PharmacistEnterTokenUI();
let PharmacistViewPrescription_boundary = new PharmacistViewPrescriptionUI();

// All Controller
let login_controller = new LoginController();
let logout_controller = new LogoutController();
let admin_controller = new AdminController();
let doctor_controller = new DoctorController();
let pharmacist_controller = new PharmacistController();

/**** Admin Controller *******/ 
let adminAddAcc_controller = new AddUserAccController();
let adminAddProfile_controller= new AddUserProfileController();
let adminSearchUser_controller = new SearchUserController();
let adminManageAcc_controller = new UpdateUserAccController();
let adminManageProfile_controller = new UpdateUserProfileController();  

/**** Doctor Controller *******/ 
let doctorAddPrescription_controller = new AddPrescriptionController();
let doctorSearchPatient_controller = new SearchPatientController();
let doctorUpdatePrescription_controller = new UpdatePrescriptionController();
let doctorSendEmail_controller = new SendEmailController();

/**** Patient Controller *******/
let patientViewPrescription_controller = new ViewPresHistoryController();

/**** Pharmacist Controller *****/
let pharmacistVerifyToken_controller = new VerifyTokenController();
let pharmacistUpdateStatus_controller = new UpdateStatusController();

// Routes ...

// Login For All Users
app.get('/', login_boundary.DisplayLogin);
app.get('/LoginPage', login_boundary.DisplayLogin);
app.post('/login', login_controller.ValidateLogin);

app.get('/logout', logout_controller.Logout);   // need to fix

// All User Homepage
app.get('/AdminHome', login_boundary.LoadAdminHome);
app.get('/DoctorHome', login_boundary.LoadDoctorHome);
app.get('/PatientHome', login_boundary.LoadPatientHome);
app.get('/PharmacistHome', login_boundary.LoadPharmacistHome);


// Admin Update User Account & Profile
app.get('/admin/editaccount/:id', adminManageAcc_boundary.DisplayUI);
app.get('/admin/editprofile/:id', adminManageProfile_boundary.DisplayUI);
app.post('/updateUserAcc', adminManageAcc_controller.UpdateUserAccount);
app.post('/updateUserProfile', adminManageProfile_controller.UpdateUserProfile);

// Admin Add Account & Profile
app.get('/Admin_AddUserAccount', adminAddAcc_boundary.DisplayAddUI);
app.get('/AddUserProfile/:id', adminAddProfile_boundary.DisplayAddUI);
app.post('/addUserAccount', adminAddAcc_controller.AddUserAccount);
app.post('/saveprofile', adminAddProfile_controller.AddUserProfile); // add user profile

// Search User Account
app.get('/Admin_SearchUser', adminSearchUser_boundary.DisplaySearchUI);
app.post("/searchuser", adminSearchUser_controller.findUser);


/**** Doctor ****/
// Search Patient..
app.get('/Doctor_SearchPatient', doctorSearchPatient_boundary.DisplaySearchUI);
app.post("/searchpatient", doctorSearchPatient_controller.findPatient);

// Add Prescription to Patient..
app.get('/doctor/addprescription/:id', doctorAddPrescription_boundary.DisplayUI);
app.post('/addPrescription', doctorAddPrescription_controller.AddPrescription);

// View & Update Prescription
app.get('/doctor/updateprescription/:id', doctorViewPrescription_boundary.DisplayUI);
app.post('/updatePrescription', doctorUpdatePrescription_controller.UpdatePrescription);

// Send Prescription..
app.post('/sendemail', doctorSendEmail_controller.SendPrescription);

/**** Patient ****/
app.get('/Patient_ViewPrescription', patientViewPrescription_boundary.DisplayUI);

/**** Pharmacist ****/ 
// Enter Token...
app.get('/Pharmacist_EnterToken', pharmacistEnterToken_boundary.DisplayUI);
app.post('/entertoken', pharmacistVerifyToken_controller.VerifyToken);

// View Prescription
app.get('/pharmacist/updatestatus/:id', PharmacistViewPrescription_boundary.DisplayUI);

// Update Prescription Status
app.post('/updateStatus', pharmacistUpdateStatus_controller.updateStatus);


app.listen(port);