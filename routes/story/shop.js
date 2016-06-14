var express   = require('express');
var router    = express.Router();
var api       = require('../../config/api.js');
var utils     = require('../../lib/utils')
var unirest   = require('unirest');

/*
 * 故事列表
 */
router.get('/', function(req, res) {
  res.render('story/shop/list')
})

/*
 * 故事添加
 */
router.get('/add', function(req, res) {
  res.render('story/shop/add')
})

/*
 * 故事编辑
 */
/*router.get('/:id', function(req, res) {

  unirest.get(api.baseApi + '/coupon/' + req.params.id)
    .end(function(result){
      var coupon = result.body;
      beginTime = utils.formatDate(new Date(coupon.beginTime),3);
      endTime = utils.formatDate(new Date(coupon.endTime),3);
      endGrabTime = utils.formatDate(new Date(coupon.endGrabTime),3);
      res.render('activity/coupon/edit',{coupon:coupon,beginTime:beginTime,endTime:endTime,endGrabTime:endGrabTime})
    })
})*/


module.exports = router;
