let express = require('express');

//Store the model in a variable
let SurveyQuestions = require('../models/surveyQuestions');

/* GET request for survey */
module.exports.displaySurveyQuestionsList = (req, res, next) => {
	SurveyQuestions.find((err, surveyQuestionsList) => {
		if (err) {
			return console.error(err);
		} else {
			/*res.render('CRUD/survey_questions_list', {
				title: 'Survey Templates',
				Survey: survey,
				//displayName:req.user ? req.user.displayName : ''
			});*/
			res.json(surveyQuestionsList);
		}
	});
};

/* GET request for create pages - CREATE Operation*/
module.exports.displayAddSurveyQuestionsPage = (req, res, next) => {
	/*res.render('CRUD/survey_questions', {
		title: 'Add questions to the survey'
		//displayName: req.user ? req.user.displayName : ''
	});*/
	res.json({
		success: true,
		msg: 'Successfully Displayed Add Survey Questions Page',
	});
};

/* POST request for add pages - CREATE Operation*/
module.exports.processAddSurveyQuestionsPage = (req, res, next) => {
	let newSurveyQuestions = SurveyQuestions({
		userId: req.body.userid,
		surveyId: req.body.surveyid,
		question1: req.body.question1,
		question2: req.body.question2,
		question3: req.body.question3,
		question4: req.body.question4,
		question5: req.body.question5,
	});

	SurveyQuestions.create(newSurveyQuestions, (err, Survey) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			// refresh the survey list
			//res.redirect('/survey/surveyList');
			res.json({
				success: true,
				msg: 'Successfully Added New Survey Questions',
			});
		}
	});
};

/* GET request for edit pages - UPDATE Operation*/
module.exports.displaySurveyQuestionEditPage = (req, res, next) => {
	let id = req.params.id;
	SurveyQuestions.findById(id, (err, surveyQuestionToEdit) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			/*res.render('CRUD/survey_questions_update', {
				title: 'Edit the Survey Question',
				Survey: surveyQuestion,
				// displayName: req.user ? req.user.displayName : '',
			});*/
			res.json({
				success: true,
				msg: 'Successfully Displayed Survey Questions to Edit',
				Survey: surveyQuestionToEdit,
			});
		}
	});
};

/* POST request for edit pages - UPDATE Operation*/
module.exports.processSurveyQuestionUpdate = (req, res, next) => {
	let id = req.params.id;
	// console.log(req.body);
	let updatedSurveyQuestion = SurveyQuestions({
		_id: id,
		userId: req.body.userid,
		surveyId: req.body.surveyid,
		question1: req.body.question1,
		question2: req.body.question2,
		question3: req.body.question3,
		question4: req.body.question4,
		question5: req.body.question5,
	});
	// console.log('Update Survey Question', updatedSurveyQuestion);
	SurveyQuestions.updateOne({ _id: id }, updatedSurveyQuestion, (err) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			//res.redirect('/surveyQuestions/surveyQuestionList');
			res.json({
				success: true,
				msg: 'Successfully Edited Survey Questions',
				Survey: updatedSurveyQuestion,
			});
		}
	});
};

/* GET request for delete - DELETE Operation*/
module.exports.performDelete = (req, res, next) => {
	let id = req.params.id;
	SurveyQuestions.remove({ _id: id }, (err) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			//res.redirect('/survey/surveyList');
			res.json({ success: true, msg: 'Successfully Deleted Survey Questions' });
		}
	});
};

/* GET request for survey question by id */
module.exports.getSurveyQuestionById = (req, res, next) => {
	const id = req.params.id;
	SurveyQuestions.findById(id, (err, surveyQuestionsList) => {
		if (err) {
			return console.error(err);
		} else {
			res.json(surveyQuestionsList);
		}
	});
};
