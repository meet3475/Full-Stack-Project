const express = require("express");
const { usersController } = require("../../../controller");

const routes = express.Router();


routes.post(
    '/register',
    usersController.ragister
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
module.exports = routes;