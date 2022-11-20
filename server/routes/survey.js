let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let passport = require('passport');

let surveyController = require('../controllers/survey');
const { findByUsername } = require('../models/survey');

/*function requireAuth(req,res,next){
    if(!req.isAuthenticated){
        return res.redirect('/login');
    }
    next();
}*/

/* GET request for surveys */
router.get('/surveyList', surveyController.displaySurveyList);

/* GET request for add pages - CREATE Operation*/
// router.get('/add', surveyController.displayAddPage);

/* POST request for add pages - CREATE Operation*/
router.post('/add', surveyController.processAddPage);

/* GET request for edit pages - UPDATE Operation*/
// router.get('/edit/:id', surveyController.displayEditPage);

/* POST request for edit pages - UPDATE Operation*/
router.post('/edit/:id', surveyController.processEditPage);

/* GET request for delete - DELETE Operation*/
router.get('/delete/:id', surveyController.performDelete);

/* GET request for surveys */
router.get('/:id', surveyController.displaySurveyById);

module.exports = router;
