var express   = require('express');
var router    = express.Router();
var db        = require('../lib/db');
var utils     = require('../lib/utils');
router.get('/', function(req, response){

  db.UserShop.findAll({
    where: {
      handlerid: req._user.id
    },
    order: 'date_created DESC'
  }).then(function(res){
    var list = [];
    res.forEach(function(d){
      d = d.dataValues;
      list.push({
        id      : d.id,
        date    : utils.formatDate(d.date_created, 2),
        userid  : d.userid,
        username: d.username,
        shopid  : d.shopid,
        shopname: d.shopname,
        handlerid: d.handlerid
      });
    });

    response.json(list);
  })
});

router.put('/', function(req, response){

  var status = req.query.status;
  var json = req.body;

  var content = JSON.parse(json.content);
  content.msg = json.msg;

  db.init(function(){

    db.Apply.update({
      content: JSON.stringify(content),
      status: status
    }, {
      where: {
        id: json.id
      }
    }).then(function(){
      response.json({});
    })

  })

})


module.exports = router;
