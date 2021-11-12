const assert = require('assert');

const {LoginController} = require("../Controller/LoginController.js");
const {Users} = require("../Entity/Users.js");

describe('Login Testing (Sprint 1)', () => {

    let user = new Users();

    const AdminData = {
        userid: 1,
        username: 'admin1',
        name: 'Ricksonn',
        role: 'Admin'
    }

    test('Admin Login', (done) => {

        function callback(data) {
            try {
                expect(data).toStrictEqual(AdminData);
                done();
            }
            catch(err) {
                done(err);
            }
        }
        user.getlogininfo('admin1', 'admin1', callback);

    })

    const DoctorData = {
        userid: 2,
        username: 'doctor1',
        name: 'John Doe',
        role: 'Doctor'
    }

    test('Doctor Login', (done) => {

        function callback(data) {
            try {
                expect(data).toStrictEqual(DoctorData);
                done();
            }
            catch(err) {
                done(err);
            }
        }
        user.getlogininfo('doctor1', 'doctor1', callback);

    })

    const PatientData = {
        userid: 4,
        username: 'patient1',
        name: 'Amelia',
        role: 'Patient'
    }

    test('Patient Login', (done) => {

        function callback(data) {
            try {
                expect(data).toStrictEqual(PatientData);
                done();
            }
            catch(err) {
                done(err);
            }
        }
        user.getlogininfo('patient1', 'patient1', callback);

    })

    const PharmacistData = {
        userid: 3,
        username: 'pharma1',
        name: 'Joe',
        role: 'Pharmacist'
    }

    test('Pharmacist Login', (done) => {

        function callback(data) {
            try {
                expect(data).toStrictEqual(PharmacistData);
                done();
            }
            catch(err) {
                done(err);
            }
        }
        user.getlogininfo('pharma1', 'pharma1', callback);

    })

    test('Admin Logout', (done) => {

        expect(user.boollogout()).toBe(true);
        done();
    })

    test('Doctor Logout', (done) => {

        expect(user.boollogout()).toBe(true);
        done();
    })

    test('Patient Logout', (done) => {

        expect(user.boollogout()).toBe(true);
        done();
    })

    test('Pharmacist Logout', (done) => {

        expect(user.boollogout()).toBe(true);
        done();
    })


});