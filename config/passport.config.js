const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = require("../models/User.model");

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user) => {
      next(null, user);
    })
    .catch((err) => next(err));
});

passport.use(
  "local-auth",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, next) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            next(null, false, { error: "Invalid credentials" });
          } else {
            return user.checkPassword(password).then((match) => {
              if (!match) {
                next(null, false, { error: "Invalid credentials" });
              } else {
                next(null, user);
              }
            });
          }
        })
        .catch((err) => next(err));
    }
  )
);

//no entra en validar credentials con google. 404 status. tendré bien el .env?
passport.use(
  "google-auth",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      const googleID = profile.id;
      const email = profile.emails[0] ? profile.emails[0].value : undefined;
      const name = profile.displayName;
      const image = profile.photos[0].value;

      if (googleID && email) {
        User.findOne({
          $or: [{ googleID }, { email }],
        })
          .then((user) => {
            if (user) {
              next(null, user);
              return;
            }
            return User.create({
              email,
              googleID,
              password: mongoose.Types.ObjectId(),
              name,
              image,
            }).then((createdUser) => {
              next(null, createdUser);
            });
          })
          .catch((err) => next(err));
      } else {
        next(null, false, { error: "Error connecting to Google Auth" });
      }
    }
  )
);
