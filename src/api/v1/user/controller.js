const User = require("./model")

const registerController = async (req, res) => {
  // let user = await User.create(req.body)
  let query = new User(req.body)
  let user = await query.save()
  res.status(201).json({
    message: "Rgistration successfull",
    user
  })
}

const allusers = async (req, res) => {
  let users = await User.find()
  res.json(users)
}

module.exports = { registerController, allusers }
