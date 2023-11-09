var express = require('express');
var router = express.Router(); 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bad path, the correct parth for api is "/api' });
}); 
module.exports = router; 