 var Sequelize = require('sequelize');
var dbConfig = require('../config/db.js');
var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  timezone: '+08:00',
  logging: false,
  pool: {
    max: 5,
    min: 1,
    idle: 10000
  }
});

var Statistics      = sequelize.import(__dirname + '/models/Statistics');
var User            = sequelize.import(__dirname + '/models/User');
var WechatConfig    = sequelize.import(__dirname + '/models/WechatConfig');
var WechatKeywords  = sequelize.import(__dirname + '/models/WechatKeywords');
var UserShop        = sequelize.import(__dirname + '/models/UserShop');

var inited = false;
var db = {
  init: function(callback) {

    if (inited) {
      callback()
      return;
    }
    sequelize.sync().then(function() {

      inited = true
      callback();

    });
  },
  sequelize: sequelize,
  Sequelize: Sequelize,

  Statistics   : Statistics,
  User         : User,
  WechatKeywords: WechatKeywords,
  WechatConfig : WechatConfig,
  UserShop      : UserShop
}

module.exports = db;
