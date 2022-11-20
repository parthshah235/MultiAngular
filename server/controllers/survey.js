let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

//Store the model in a variable
let Survey = require('../models/survey');

/* GET request for survey  */
module.exports.displaySurveyList = (req, res, next) => {
	Survey.find((err, surveyList) => {
		if (err) {
			return console.error(err);
		} else {
			/*res.render('CRUD/list', {
                title: 'Survey Templates', 
                Survey: surveyList 
                //displayName:req.user ? req.user.displayName : ''
            })*/
			res.json(surveyList);
		}
	});
};

/* GET request for create pages - CREATE Operation*/
module.exports.displayAddPage = (req, res, next) => {
	/*res.render('CRUD/add', {
        title: 'Add Survey' 
        //displayName: req.user ? req.user.displayName : ''
    })*/

	res.json({ success: true, msg: 'Successfully Displayed Add Survey Page' });
};

/* POST request for add pages - CREATE Operation*/
module.exports.processAddPage = (req, res, next) => {
	let newSurvey = Survey({
		userId: req.body.userId,
		title: req.body.title,
		description: req.body.description,
	});

	Survey.create(newSurvey, (err, Survey) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			// refresh the survey list
			//res.redirect('/survey/surveyList');
			res.json({ success: true, msg: 'Successfully Added New Survey' });
		}
	});
};

/* GET request for edit pages - UPDATE Operation*/
module.exports.displayEditPage = (req, res, next) => {
	let id = req.params.id;
	Survey.findById(id, (err, surveyToEdit) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			//res.render('CRUD/edit', {title:'Edit the Survey', Survey: surveyToEdit, displayName:req.user ? req.user.displayName : ''})
			res.json({
				success: true,
				msg: 'Successfully Displayed Survey to Edit',
				Survey: surveyToEdit,
			});
		}
	});
};

/* POST request for edit pages - UPDATE Operation*/
module.exports.processEditPage = (req, res, next) => {
	let id = req.params.id;
	let updatedSurvey = Survey({
		_id: id,
		userId: req.body.userId,
		title: req.body.title,
		description: req.body.description,
	});
	Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			//res.redirect('/survey/surveyList')
			res.json({
				success: true,
				msg: 'Successfully Edited Survey',
				Survey: updatedSurvey,
			});
		}
	});
};

/* GET request for delete - DELETE Operation*/
module.exports.performDelete = (req, res, next) => {
	let id = req.params.id;
	Survey.remove({ _id: id }, (err) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			//res.redirect('/survey/surveyList');
			res.json({ success: true, msg: 'Successfully Deleted Survey' });
		}
	});
};

/* GET request for survey id  */
module.exports.displaySurveyById = (req, res, next) => {
	const id = req.params.id;
	Survey.findById(id, (err, surveyList) => {
		if (err) {
			return console.error(err);
		} else {
			res.json(surveyList);
		}
	});
};
