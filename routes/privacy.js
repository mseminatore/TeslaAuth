var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('privacy', { title: 'Privacy Statement' });
});

module.exports = router;
