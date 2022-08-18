const router = require ('express').Router()
const authController = require('../controllers/auth.controller')
const usersController = require("../controllers/users.controller")
const miscController = require ("../controllers/misc.controller")
const authMiddleware = require("../middleware/authMiddleware")

//MISCELLANEOUS
router.get("/", miscController.home)

//AUTHENTICATION
router.get("/register", authController.register)
router.post("/register", authController.doRegister)

router.get("/login", authMiddleware.isNotAuthenticated, authController.login)
router.post("/login", authController.doLogin)

router.get("/logout", authController.logout)

//USERS
router.get("/profile", authMiddleware.isAuthenticated, usersController.profile)

module.exports = router