let mongoose = require('mongoose');

let surveyAnswersModel = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			default: 1,
			required: [true, 'User Id is required'],
			ref: 'User',
		},
		questionId: {
			type: mongoose.Schema.Types.ObjectId,
			default: 1,
			required: [true, 'Survey Id is required'],
			ref: 'SurveyQuestions',
		},
		answer1: {
			type: String,
			default: '',
			trim: true,
			required: 'Answer is required',
		},
		answer2: {
			type: String,
			default: '',
			trim: true,
			required: 'Answer is required',
		},
		answer3: {
			type: String,
			default: '',
			trim: true,
			required: 'Answer is required',
		},
		answer4: {
			type: String,
			default: '',
			trim: true,
			required: 'Answer is required',
		},
		answer5: {
			type: String,
			default: '',
			trim: true,
			required: 'Answer is required',
		},
	},
	{
		collection: 'surveyanswers',
	}
);

module.exports = mongoose.model('SurveyAnswers', surveyAnswersModel);
