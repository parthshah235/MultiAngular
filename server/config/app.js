// install 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

// module for Authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
})

let indexRouter = require('../routes');
let surveyRouter = require('../routes/survey');
let surveyQuestionsRouter = require('../routes/surveyQuestions');
let surveyAnswersRouter = require('../routes/surveyAnswers');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); // which ever inside public folder is available public
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors());

// setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// create a User model instance
let userModel = require('../models/user');
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err, false);
      })
});

passport.use(strategy);


app.use('/api', indexRouter);
app.use('/api/survey', surveyRouter);
app.use('/api/surveyQuestions', surveyQuestionsRouter);
app.use('/api/surveyAnswers', surveyAnswersRouter);
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error pages
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
