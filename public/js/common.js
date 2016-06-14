window.formatDate = function(d, type) {
  if (d instanceof Date) {

    // 12.25
    if (type === 0){
      return (d.getMonth() + 1) + '.' + d.getDate();

    // 20150225
    } else if (type === 1){
      var month = d.getMonth() + 1;
      month = month >= 10 ? month + '' : '0' + month;
      var date = d.getDate();
      date = date >= 10 ? date + '' : '0' + date;
      return d.getFullYear() + '' + month + '' + date;

    // 2015-5-25 15:30:5
    } else if (type === 2) {
      var hour = d.getHours();
      hour = hour >= 10 ? hour + '' : '0' + hour;
      var minute = d.getMinutes();
      minute = minute >= 10 ? minute + '' : '0' + minute;
      var second = d.getSeconds();
      second = second >= 10 ? second + '' : '0' + second;
      return formatDate(d) + "  " + hour + ":" + minute + ":" + second;

    // 5-25 15:30:13
    } else if (type === 3) {
      return formatDate(d, 4) + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    // 5-12
    } else if (type === 4) {
      return (d.getMonth() + 1) + '-' + d.getDate();

    // 2015/05/06
    } else if (type === 5){
      var month = d.getMonth() + 1;
      month = month >= 10 ? month + '' : '0' + month;
      var date = d.getDate();
      date = date >= 10 ? date + '' : '0' + date;
      return d.getFullYear() + '' + month + '' + date;
    }else if(type === 6){//限时抢购专用时间type
      var month = d.getMonth() + 1;
      month = month >= 10 ? month + '' : '0' + month;
      var date = d.getDate();
      date = date >= 10 ? date + '' : '0' + date;
      var hour = d.getHours();
      hour = hour >= 10 ? hour + '' : '0' + hour;
      var minute = d.getMinutes();
      minute = minute >= 10 ? minute + '' : '0' + minute;
      /*var second = d.getSeconds();
      second = second >= 10 ? second + '' : '0' + second;*/
      return d.getFullYear() + '-' + month + '-' + date + " " + hour + ":" + minute;
    }

    // 2015-5-25
    var month = d.getMonth() + 1;
    month = month >= 10 ? month + '' : '0' + month;
    var date = d.getDate();
    date = date >= 10 ? date + '' : '0' + date;
    return d.getFullYear() + '/' + month + '/' + date;

  }
  return 'Date-error';
}

window.ajaxUploadOnEnd = function(d) {
  var url = d.results[0].url;
  $(this).parent().find('input').val(url)
  $(this).parent().find('.upload-img').css('background-image', 'url(' + url + ')').show();
}
