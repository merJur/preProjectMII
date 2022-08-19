module.exports.isNotAuthenticated = (req, res, next) => {
  //if (req.isUnauthenticated()) {
    if (req.isNotAuthenticated()) {
      console.log("is unauthenticated")
      next();
    } else {
      res.redirect("/profile");
    }
  };
  
  module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log("autenticado entra a profile")
    next();
    } else {
      res.redirect("/login");
    }
  };