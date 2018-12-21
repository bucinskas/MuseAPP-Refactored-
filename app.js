require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser'); 
const logger = require('morgan');
const session = require("express-session");
const mongoose = require("mongoose"); 
const methodOverride = require("method-override");



// required with passport js 
const User = require('./models/user');


const usersRouter = require('./routes/users');
const shotsRouter = require('./routes/shots');
const commentsRouter = require('./routes/comments');

const indexRouter = require('./routes/index');


const app = express();


// connect to the db 
mongoose.connect('mongodb://localhost:27017/muteRefactored', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});

// use ejs-locals for all ejs templates: 
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// configure express-session // has to go BEFORE PASSPORT CONFIGURATION
app.use(session({
  secret: 'simple secret',
  resave: false,
  saveUninitialized: true,
  
}));

app.locals.moment = require('moment');

app.use(passport.initialize());
app.use(passport.session());

// configure passport 
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware 
app.use(function(req, res, next){
  // req.user = {
  //   "_id" : "5bdc44f59adc9b0ec21c1fe4",
  //   "username" : "bucinskasm"
  // }
  res.locals.currentUser = req.user; 
  // set default page title 
  res.locals.title = "Mute APP";
  // set success flash message 
  res.locals.success = req.session.success || ''; 
  delete req.session.success; 
  // set error flash message 
  res.locals.error = req.session.error || ''; 
  delete req.session.error; 
  // continue on to next function in middleware chain 
  next(); 
}); 

// mount routes 

app.use('/users', usersRouter);
app.use('/shots', shotsRouter);
app.use('/shots/:id/comments', commentsRouter);

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error'); 
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});


module.exports = app;
