const Router = require("express").Router()

Router.use("/auth", require("./user/routes"))
Router.use("/articles", require("./article/routes"))
Router.use("/comments", require("./comment/routes"))

module.exports = Router
