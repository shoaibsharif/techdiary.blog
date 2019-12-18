const Router = require("express").Router()
const { registerController, allusers } = require("./controller")

Router.post("/register", registerController)
Router.get("/users", allusers)

module.exports = Router
