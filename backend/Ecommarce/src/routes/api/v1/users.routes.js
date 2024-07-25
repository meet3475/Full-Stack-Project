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

module.exports = routes;