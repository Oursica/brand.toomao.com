var express   = require('express');
var router    = express.Router();
var db        = require('../lib/db');
var utils     = require('../lib/utils');
var uuid      = require('uuid');


/*
获取系统用户列表
 */
router.get('/', function(req, response){

  db.User.findAll({

  }).then(function(d){
    var res = [];
    d.forEach(function(t){
      t = t.dataValues;
      res.push({id: t.id, mobile: t.mobile, nickname: t.nickname});
    })
    response.json(res)
  })
});

/*
添加系统用户
 */
router.post('/', function(req, response){
  var json = req.body;
  var salt = uuid.v4().substr(0, 8);
  console.log('#' + salt + '#');
  db.User.create({
    mobile: json.mobile,
    nickname: json.nickname,
    password: utils.md5(json.password + salt),
    salt: salt,
    session_token: uuid.v4(),
    auth: json.auth
  }).then(function(){
    response.json({})
  })
})

router.put('/', function(req, response){



})

router.delete('/:id', function(req, res){
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(d){
    res.json({})
  });
})


module.exports = router;
