module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) {
  //  if (req.isNotAuthenticated()) {
      console.log("is unauthenticated") //pinta este log al darle al a de login. pero dsp np hace login
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