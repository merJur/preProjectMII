const User = require("../models/User.model");
const mongoose = require("mongoose");
const passport = require("passport");

module.exports.register = (req, res, next) => {
  res.render("auth/register");
};

module.exports.doRegister = (req, res, next) => {
  const user = req.body;

  const renderWithErrors = (errors) => {
    res.render("auth/register", { errors, user });
  };

  User.findOne({ email: user.email })
    .then((userFound) => {
      if (userFound) {
        renderWithErrors("Email already exist");
      } else {
        return User.create(user).then((userCreated) => {
          res.redirect("/profile");
        });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors);
      } else {
        next(err);
      }
    });
};

const login = (req, res, next, provider) => {
  passport.authenticate(provider || "local-auth", (err, user, validations) => {
    if (err) {
      console.log("entra a error") //no entra
      next(err)
    } else if (!user) {
      console.log("entra a no usuario") //tampoco imprime este log
      res.status(404).render("auth/login", { errors: validations.error })
    } else {
      console.log("login hecho, debería ir a profile") //aquí no entra
      req.login(user, (loginError) =>{
        if (loginError) {
          next (loginError)
        } else {
          res.redirect("/profile")
        }
      })
    }
  }) (req, res, next)
}

module.exports.login = (req, res, next) => {
  res.render("auth/login")
}

module.exports.doLogin = (req, res, next) => {
  console.log("entra aqui?") //tampoco entra aquí
 login(req, res, next)
}

module.exports.doLoginGoogle = (req, res, next) => {
  login(req, res, next, "google-auth")
}

module.exports.logout = (req, res, next) => {
 req.logout(() => res.redirect("/login"))
};
