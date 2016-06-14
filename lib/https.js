module.exports = function(req, res, next) {

  // Cron task
  if (process.env.NODE_ENV === 'production' && req.originalUrl && req.originalUrl.indexOf('statistics/update') !== -1) {
    next()
  }

  // ACE env & not https
  if (process.env.NODE_ENV === 'production' && req.headers['ace-protocol'] == 'http') {

    console.log('https required, redirect to: https://' + req.headers.host + req.originalUrl);
    res.redirect('https://' + req.headers.host + req.originalUrl);

  } else {
    next();
  }
}
