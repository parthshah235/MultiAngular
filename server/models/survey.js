let mongoose = require('mongoose');

let surveyModel = mongoose.Schema(
    {
        userId:
            {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
        surveyId:
            {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
        title:
            {
                type: String,
                default: '',
                trim: true,
                required: 'Title is required'
            },
        description:
            {
                type: String,
                default: '',
                trim: true,
                required: 'Description is required'
            },
        date:
            {
                type: Date, 
                default: Date.now
            }
    },
    {
        collection: "survey"
    }
);

module.exports = mongoose.model('Survey', surveyModel);


