process.env.NODE_PORT = process.env.NODE_PORT || '3006';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var db          = require('./lib/db')
var apiConfig   = require('./config/api')

var app = express();
app.set('x-powered-by', false);

require('./lib/console')
// set view path
app.set('views', path.join(__dirname, 'views'));

// Set express locals.
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(__dirname + '/views/common/menu.json', 'utf8'));
app.locals.menu = obj;
app.locals.pretty = true;
for (var i in apiConfig) {
  app.locals[i] = apiConfig[i];
}


// set view engine
app.set('view engine', 'jade');


app.use(favicon(__dirname + '/public/favicon.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ueditor-proxy
require('./routes/ueditor-proxy.js')(app);

app.use(require('./lib/https'));

// UA 检测
var uaChecker = function(req) {
  var ua = req.headers['user-agent'];

  if (!ua) return true;

  ua = ua.toLowerCase();

  var keys = [
    'chrome',
    'firefox',
    'webkit', // applewebkit
  ];
  for (var i = 0, max = keys.length; i < max; i++) {
    if (ua.indexOf(keys[i]) !== -1) return true;
  }

  return false;
}

// 游览器屏蔽
app.use('/', function(req, res, next) {

  if (!uaChecker(req)) {
    res.redirect('/ie.html')
  } else {
    next();
  }

});

// 数据库初始化
var dbInited = false;
app.use('/', function(req, res, next){
  if (dbInited === false) {
    db.init(function(){
      dbInited = true;
      next();
    })
  } else {
    next();
  }
})
GLOBAL.userCaches = {};

// 登录过滤
app.use(function(req, res, next){

  if (req.originalUrl === '/login') {
    return next();
  }

  // Check sc cookie is exist.
  var sc = req.cookies['sc'];
  if (sc === undefined) {
    res.redirect('/login');
    return;
  }

  // Check user
  if (userCaches[sc]) {
    next();
  } else {

    db.User.findOne({
      where: {
        session_token: sc
      }
    }).then(function(u){
      if (u) {
        // req._user = u.dataValues
        userCaches[sc] = u.dataValues;
        next()
      } else {
        res.redirect('/login');
      }
    })
  }
});

app.use('/'             , require('./routes/index'));

// 数据统计
app.use('/statistics'   , require('./routes/statistics'))

app.use('/brand'        , require('./routes/brand'));
app.use('/user'         , require('./routes/user'));
app.use('/userShop'     , require('./routes/userShop'));

/*
 * 资讯平台
 *   资讯管理
 */
app.use('/news/information'     , require('./routes/news/information'));


/*
 * 商家故事
 *   走访故事
 */
app.use('/story/shop'     , require('./routes/story/shop'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  if (err.status === 404) {
    console.error('404 Not Found:' + req.originalUrl)
    res.sendFile(__dirname + '/public/404.html')
  } else {
    console.error(err.stack);
    res.sendFile(__dirname + '/public/500.html')
  }

});
app.listen(+process.env.NODE_PORT);
console.log('Server listen on ' + process.env.NODE_PORT)
