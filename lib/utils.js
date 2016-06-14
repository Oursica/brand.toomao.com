var crypto = require('crypto');
var utils =  {
  getDate: function(d) {
    if (d instanceof Date) {
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    } else {
      return 'Date-error'
    }
  },
  two: function(n) {
    return n > 9 ? n + '' : '0' + n;
  },
  formatDate: function(d, type) {
    if (d instanceof Date) {

      // 12.25
      if (type === 0){
        return (d.getMonth() + 1) + '.' + d.getDate();

      // 20150225
      } else if (type === 1){
        var month = d.getMonth() + 1;
        month = month > 10 ? month + '' : '0' + month;
        var date = d.getDate();
        date = date > 10 ? date + '' : '0' + date;
        return d.getFullYear() + '' + month + '' + date;

      // 2015-5-25 15:30:5
      } else if (type === 2) {
        return utils.formatDate(d) + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

      // 2015-05-05T15:30
      } else if (type === 3) {

        /**
        *
        *  注意，当前服务器时区必须设置为+8，网页才能正常显示
        *
        **/
        // 当前时区为北京+8区，转成UTC时间需要减去8小时
        d = new Date(d.getTime() - 8 * 60 * 60 * 1000);
        return utils.formatDate(d) + 'T' + utils.two(d.getHours()) + ':' + utils.two(d.getMinutes());
      }

      // 2015-5-25
      return d.getFullYear() + '-' + utils.two(d.getMonth() + 1) + '-' + utils.two(d.getDate());

    }
    return 'Date-error';
  },
  getYesterdayString: function(dd) {
    var d = dd || new Date();
    d = new Date(d.getTime() - 24 * 60 * 60 * 1000);
    return utils.formatDate(d, 1);
  },
  getYesterdayDate: function(dd) {
    var d = dd || new Date();
    d = new Date(d.getTime() - 24 * 60 * 60 * 1000);
    d = utils.formatDate(d);
    // Fix utc bug
    return new Date(d + ' 00:00:00Z');
  },
  toUTC: function (d) {
    d = utils.formatDate(d);
    // Fix utc bug
    return new Date(d + ' 00:00:00Z');
  },
  md5: function(str){

    var md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
  },
  sha1: function(str) {

    var shasum = crypto.createHash('sha1');
    shasum.update(str);
    return shasum.digest('hex');
  },
  hmacSha1: function(signStr, key) {

    var sha = crypto.createHmac('sha1', key);
    sha.update(signStr);

    var buf1 = new Buffer(sha.digest());
    var buf2 = new Buffer(signStr);
    var buf = new Buffer(buf1.length + buf2.length);
    buf1.copy(buf, 0);
    buf2.copy(buf, buf1.length);

    return buf.toString('base64');

  }
}



module.exports = utils;
