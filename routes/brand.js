var express   = require('express');
var router    = express.Router();
var api       = require('../config/api.js');
var utils     = require('../lib/utils')
var unirest   = require('unirest');
var logistics = [];

// 拉取最新的快递公司列表
unirest.get(api.rootApi + '/1.1/static/list')
.end(function(res){
  try {
    logistics = res.body.express;
    console.log('logistics updated');
  } catch(e) {
    console.error(e.stack);
  }
})



/*
通用页面路由
 */
router.get('/v/index', function(req, res) {
  res.render('index', {user: userCaches[req.cookies['sc']]})
})

router.get('/v/:view', function(req, res){

  var sc = req.cookies['sc'];
  console.log('render: views/' + req.params.view);

  res.render(req.params.view, {user: userCaches[sc]});
});

router.get('/v/:viewa/:viewb', function(req, res){

  var sc = req.cookies['sc'];
  var path = req.params.viewa + '/' + req.params.viewb;
  console.log('render: ' + path);

  res.render(path, {user: userCaches[sc]});
});


module.exports = router;
