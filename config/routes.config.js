const router = require ('express').Router()
const passport = require("passport")
const authController = require('../controllers/auth.controller')
const usersController = require("../controllers/users.controller")
const miscController = require ("../controllers/misc.controller")
const authMiddleware = require("../middleware/authMiddleware")
const birdController = require("../controllers/bird.controller");

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
router.get("/logout", authMiddleware.isAuthenticated, authController.logout)
//passport auth local token
router.get('/activate/:token', authMiddleware.isNotAuthenticated, authController.activateAccount)
//passport auth (google credentials)
router.get("/login/google", authMiddleware.isNotAuthenticated, passport.authenticate("google-auth", {scope: SCOPES}));
router.get("/auth/google/callback", authMiddleware.isNotAuthenticated, authController.doLoginGoogle)


//USERS /admin(falta)
router.get("/profile", authMiddleware.isAuthenticated, usersController.profile)

//BIRDS
router.get("/bird/list", birdController.list)
router.get("/bird/create", birdController.create);
router.post("/bird/create", birdController.doCreate)
router.get("/bird/:id", birdController.birdDetail);


module.exports = router