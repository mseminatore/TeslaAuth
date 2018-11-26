var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var tjs = require('teslajs');

// define routes
var index = require('./routes/index');
var privacy = require('./routes/privacy');
var terms = require('./routes/terms');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// define pages
app.use('/', index);
app.use('/privacy', privacy);
app.use('/terms', terms);

//
app.post('/login', function (req, res, next) {
  tjs.login(req.body.username, req.body.password, function(err, result) {
    var redirect_uri = app.locals.redirect_uri;
    var state = app.locals.state;

//    console.log(redirect_uri);
//    console.log(state);
    // TODO - verify the client_id and fail if not a match

    // return the auth and refresh tokens and also return required Alexa params
    // request includes: state, response_type, scope, and redirect_uri
    var uri = redirect_uri + "#state=" + state + "&access_token=" + result.authToken + "&refresh_token=" + result.refreshToken + "&expires_in=" + result.body.expires_in + "&created_at=" + result.body.created_at + "&token_type=" + result.body.token_type;
    console.log(uri);
    res.redirect(uri);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
