const router = require ('express').Router()
const passport = require("passport")
const authController = require('../controllers/auth.controller')
const usersController = require("../controllers/users.controller")
const miscController = require ("../controllers/misc.controller")
const authMiddleware = require("../middleware/authMiddleware")

const SCOPES = [
    "profile", 
    "email"
]

//MISCELLANEOUS
router.get("/", miscController.home)

//AUTHENTICATION
router.get("/register", authController.register)
router.post("/register", authController.doRegister)
router.get("/login", authMiddleware.isNotAuthenticated, authController.login)
router.post("/login", authController.doLogin)
router.get("login/google", authMiddleware.isNotAuthenticated, passport.authenticate("google-auth", {scope: SCOPES}));
router.get("/auth/google/callback", authMiddleware.isNotAuthenticated, authController.doLoginGoogle)
router.get("/logout", authMiddleware.isAuthenticated, authController.logout)

//USERS
router.get("/profile", authMiddleware.isAuthenticated, usersController.profile)

module.exports = router