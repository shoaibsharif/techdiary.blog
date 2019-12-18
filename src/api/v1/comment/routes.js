const Router = require("express").Router()
const { destroy, update, store } = require("./controllers")

Router.route("/").post(store)

Router.route("/:id")
  .put(update)
  .delete(destroy)

module.exports = Router
