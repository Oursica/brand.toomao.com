var express = require('express');
var router  = express.Router();
var request = require('request');
var db      = require('../lib/db');
var api     = require('../config/api');
var utils   = require('../lib/utils')


// 定时任务，每天执行一次，统计上一天的用户、店铺、活动数据
router.get('/update', function(req, response, next) {

  // 查询数据
  var date    = '';

  if (req.query.date) {

    date = new Date(req.query.date)
    if ( Number.isNaN(date.getTime()) ) {
      return response.end('Invalid date')
    }
  } else {
    // Yesterday
    date = new Date(Date.now() - 24 * 60 * 60 * 1000);
  }

  request(api.baseApi + '/statistics?date=' + utils.formatDate(date, 1), function(err, res, body){
    if (err) {
      //var err = new Error('Not Found');
      err.status = 500;
      next(err);
    } else {
      // 插入数据
      var body = JSON.parse(body);
      var insertData = function() {
        db.Statistics.create({
          date: utils.toUTC(date),
          user_total: body.user.total,
          user_increase: body.user.increase,

          shop_total: body.shop.total,
          shop_increase: body.shop.increase,

          event_total: 0,
          event_increase: 0,

          product_total: body.product.total,
          product_increase: body.product.increase,

          cate_total: body.cate.total,
          cate_increase: body.cate.increase
        }).then(function(){
          response.json({msg:"插入成功"});
        })
      }

      // 查询当前是否已经存在数据
      // 如果存在，则不重复插入
      // 如果不存在，则插入

      db.Statistics.count({
        where: {

          date: utils.toUTC(date)
        }
      }).then(function(n){

        if (n === 0) {
          insertData();
        } else {
          response.json({msg:"已存在数据"})
        }
      })

    }
  })

})

router.get('/shop', function(req, res) {

  db.Statistics.findAll({
    where: {
      date: {
        $gt: utils.toUTC(new Date(Date.now() - 50 * 24 * 60 * 60 * 1000))
      }
    },
    order: 'date',
  }).then(function(result){
    var labels = [];
    var total = [];
    var increase = [];
    result.forEach(function(d){
      labels.push(utils.formatDate(d.date, 0))
      total.push(d.shop_total)
      increase.push(d.shop_increase);
    })
    res.json({labels: labels, total: total, increase: increase});
  });

});

router.get('/user', function(req, res) {


  db.Statistics.findAll({
    where: {
      date: {
        $gt: utils.toUTC(new Date(Date.now() - 50 * 24 * 60 * 60 * 1000))
      }
    },
    order: 'date',
  }).then(function(result){
    var labels = [];
    var total = [];
    var increase = [];
    result.forEach(function(d){
      labels.push(utils.formatDate(d.date, 0))
      total.push(d.user_total)
      increase.push(d.user_increase);
    })
    res.json({labels: labels, total: total, increase: increase});
  });


});

router.get('/event', function(req, res) {

  db.Statistics.findAll({
    where: {
      date: {
        $gt: utils.toUTC(new Date(Date.now() - 50 * 24 * 60 * 60 * 1000))
      }
    },
    order: 'date',
  }).then(function(result){
    var labels = [];
    var total = [];
    var increase = [];
    result.forEach(function(d){
      labels.push(utils.formatDate(d.date, 0))
      total.push(d.event_total)
      increase.push(d.event_increase);
    })
    res.json({labels: labels, total: total, increase: increase});
  });

});

router.get('/product', function(req, res) {

  db.Statistics.findAll({
    where: {
      date: {
        $gt: utils.toUTC(new Date(Date.now() - 50 * 24 * 60 * 60 * 1000))
      }
    },
    order: 'date',
  }).then(function(result){
    var labels = [];
    var total = [];
    var increase = [];
    result.forEach(function(d){
      labels.push(utils.formatDate(d.date, 0))
      total.push(d.product_total)
      increase.push(d.product_increase);
    })
    res.json({labels: labels, total: total, increase: increase});
  });


});

router.get('/cate', function(req, res) {

  db.Statistics.findAll({
    where: {
      date: {
        $gt: utils.toUTC(new Date(Date.now() - 50 * 24 * 60 * 60 * 1000))
      }
    },
    order: 'date',
  }).then(function(result){
    var labels = [];
    var total = [];
    var increase = [];
    result.forEach(function(d){
      labels.push(utils.formatDate(d.date, 0))
      total.push(d.cate_total)
      increase.push(d.cate_increase);
    })
    res.json({labels: labels, total: total, increase: increase});
  });


});

module.exports = router;
