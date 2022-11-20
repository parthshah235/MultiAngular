let mongoose = require('mongoose');

let surveyQuestionsModel = mongoose.Schema(

	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			default: 1,
			required: [true, 'userId is required'],
			ref: 'User',
		},
		surveyId: {
			type: mongoose.Schema.Types.ObjectId,
			default: 1,
			required: [true, 'Survey Id is required'],
			ref: 'Survey',
		},
		question1: {
			type: String,
			default: '',
			trim: true,
			required: 'Question 1 is required',
		},
		question2: {
			type: String,
			default: '',
			trim: true,
			required: 'Question 2 is required',
		},
		question3: {
			type: String,
			default: '',
			trim: true,
			required: 'Question 3 is required',
		},
		question4: {
			type: String,
			default: '',
			trim: true,
			required: 'Question 4 is required',
		},
		question5: {
			type: String,
			default: '',
			trim: true,
			required: 'Question 5 is required',
		},
	},
	{
		collection: 'surveyquestions',
	}
);

module.exports = mongoose.model('SurveyQuestions', surveyQuestionsModel);
