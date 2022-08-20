const User = require("../models/User.model");

module.exports.profile = (req, res, next) => {
  console.log('entro a profile')
  res.render("users/profile");
};