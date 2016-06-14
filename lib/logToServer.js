
/*
  Server @ https://github.com/zhoukekestar/SLS
 */
var config  = require('../config/log')
    https   = require('https'),
    http    = require('http'),
    crypto  = require('crypto');

function md5(str) {
  var md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
}

module.exports = function(level, name, msg) {

  var postData = JSON.stringify({
    project: config.project,
    level: level,
    name: name,
    msg: msg || ''
  });

  var time = new Date().getTime();
  var options = {
    hostname: config.hostname,
    port: config.port,
    path: config.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      'X-TIME': time,
      'X-SIGN': md5(config.signCode + time)
    }
  };

  var req;
  if (config.https) {

    req = https.request(options, function(res) {

      res.on('data', function (chunk) {
        if (config.debug)
          console._log('logToServer debug: ' + chunk);
      });
    });

  } else {

    req = http.request(options, function(res) {

      res.on('data', function (chunk) {
        if (config.debug)
          console._log('logToServer debug: ' + chunk);
      });
    });

  }

  req.on('error', function(e) {
    if (config.debug)
      console._error('logToServer error: ' + e.message);
  });

  req.write(postData);
  req.end();
}
