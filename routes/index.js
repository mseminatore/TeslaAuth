var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("redirect: " + req.query.redirect_uri);
  console.log("state: " + req.query.state);
//  console.log(req);

  req.app.locals.redirect_uri = req.query.redirect_uri;
  req.app.locals.state = req.query.state;

  res.render('index', { title: 'Tesla-Alexa Account linking' });
});

module.exports = router;
