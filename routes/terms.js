var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('terms', { title: 'Terms of Use' });
});

module.exports = router;
