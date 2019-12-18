const Router = require("express").Router()
const { index, show, destroy, update, store } = require("./controllers")

Router.route("/")
  .get(index)
  .post(store)
Router.route("/:id")
  .get(show)
  .put(update)
  .delete(destroy)

module.exports = Router
