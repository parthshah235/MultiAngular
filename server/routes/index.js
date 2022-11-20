// require modules for the index pages
let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');
let passport = require('passport');

/* GET Home pages. */
//router.get('/', indexController.displayHomePage);
//router.get('/home', indexController.displayHomePage);

// GET Route for displaying Login pages
//router.get('/login', indexController.displayLoginPage);

// POST Route for processing Login pages
router.post('/login', indexController.processLoginPage);

// GET Route for displaying Register pages
//router.get('/register', indexController.displayRegisterPage);

// POST Route for processing Register pages
router.post('/register', indexController.processRegisterPage);

/* GET request for edit pages - UPDATE Operation*/
router.get('/user/edit/:id', passport.authenticate('jwt', {session: false}), indexController.displayEditRegistrationPage);

/* POST request for edit pages - UPDATE Operation*/
router.post('/user/edit/:id', passport.authenticate('jwt', {session: false}), indexController.processEditRegistrationPage);

// change password
router.post('/user/chanePassword/:id', passport.authenticate('jwt', {session: false}), indexController.changePassword);


// GET to perform User Logout
router.get('/logout', indexController.performLogout);

module.exports = router;
