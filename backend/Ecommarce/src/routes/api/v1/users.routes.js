const express = require("express");
const { usersController } = require("../../../controller");
const passport = require("passport");
const sentMail = require("../../../utils/nodemailer");
const exportpdfmake = require("../../../utils/pdfmake");
const { sendOTP, verifyOTP } = require("../../../utils/twilio");



const routes = express.Router();


routes.post(
    '/register',
    usersController.ragister
)

routes.post(
    '/registerOTP',
    sendOTP,
    usersController.ragisterOTP
)

routes.post(
    '/verifyOTP',
    verifyOTP,
    usersController.verifyotp
)


routes.post(
    '/login',
    usersController.login
)

routes.post(
    '/generateNewTokens',
    usersController.generateNewTokens
)

routes.post(
    '/logout',
    usersController.logout
)

routes.get(
    '/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("login sucessfully");
        // Successful authentication, redirect home.
        // res.redirect('/');
    });


routes.get(
    '/facebookLogin',
    passport.authenticate('facebook', { scope: ["public_profile", "email"] })
);

routes.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("login sucessfully");
        // Successful authentication, redirect home.
        res.redirect('/');
    });


// routes.get(
//     '/sendMail',
//     sentMail
// )

routes.get(
    '/pdfmake',
    exportpdfmake
)




module.exports = routes;