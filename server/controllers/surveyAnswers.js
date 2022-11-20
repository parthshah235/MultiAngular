let express = require('express');

//Store the model in a variable
let SurveyAnswers = require('../models/surveyAnswers');

/* GET request for survey */
module.exports.displaySurveyAnswersList = (req, res, next) => {
	SurveyAnswers.find((err, surveyAnswersList) => {
		if (err) {
			return console.error(err);
		} else {
			res.json(surveyAnswersList);
		}
	});
};

/* GET request for create pages - CREATE Operation*/
module.exports.displayAddSurveyAnswersPage = (req, res, next) => {
	res.json({
		success: true,
		msg: 'Successfully Displayed Add Survey Answers Page',
	});
};

/* POST request for add pages - CREATE Operation*/
module.exports.processAddSurveyAnswers = (req, res, next) => {
	console.log('Add');
	const answer = new SurveyAnswers({
		userId: req.body.userId,
		questionId: req.body.questionId,
		answer1: req.body.answer1,
		answer2: req.body.answer2,
		answer3: req.body.answer3,
		answer4: req.body.answer4,
		answer5: req.body.answer5,
	});
	console.log(answer);
	answer.save((err) => {
		if (err) {
			console.log(err);
			res.end(err);
		} else {
			// refresh the survey list
			//res.redirect('/survey/surveyList');
			res.json({ success: true, msg: 'Thank You, Your Survey Complete!!' });
		}
	});
};

/* GET request for survey answers by id */
module.exports.getSurveyAnswersById = (req, res, next) => {
	const id = req.params.id;
	SurveyAnswers.find({ questionId: id }, (err, data) => {
		if (err) {
			return console.error(err);
		} else {
			res.json(data);
		}
	});
};
