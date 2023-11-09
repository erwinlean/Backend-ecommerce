<<<<<<< HEAD
var express = require('express');
var router = express.Router(); 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bad path, the correct parth for api is "/api' });
}); 
=======
var express = require('express');
var router = express.Router(); 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 
>>>>>>> f89ca1459a0986a835c57ae79333a48ae82ec41e
module.exports = router; 