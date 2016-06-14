var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var db = require('../lib/db')
var utils = require('../lib/utils')

router.get('/', function(req, res) {
  res.redirect('/brand/v/index')
})

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res){


  db.User.findOne({
    where: {
      mobile: req.body.name
    }
  }).then(function(d){

    if (d) {
      d = d.dataValues;
      if (d.password === utils.md5(req.body.password + d.salt)) {
        res.cookie('sc', d.session_token, {expires: 0, httpOnly: true }).json({code: 0, msg:"登录成功"});
      } else {
        res.json({code: 1, msg:"用户名或密码错误"});
      }
    } else {
      res.json({code: 1, msg:"用户名或密码错误"});
    }
  })

});

router.all('/logout', function(req, res){
  res.clearCookie('sc')
  res.redirect('/');
})

module.exports = router;
