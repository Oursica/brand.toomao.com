
if (process.env.NODE_ENV === 'production') {

  console.log('log.js exports production env.')
  module.exports = {

    signCode: 'toomao.abc.123',
    project: 'brand.toomao.com',
    hostname: 'log.toomao.com',
    port: 80,
    path: '/MongoDB/logs',
    debug: false
  }

} else if (process.env.OS !== 'Windows_NT') {

  console.log('log.js exports TEST env. TEST!!');

  module.exports = {

    signCode: 'toomao.abc.123',
    project: 'dev-brand.toomao.com',
    hostname: 'log.toomao.com',
    port: 80,
    path: '/MongoDB/logs',
    debug: false
  }

} else {
  console.log('log.js exports local env. LOCAL!!');

  module.exports = {

    signCode: 'your-sign-code',
    project: 'brand.toomao.com',
    hostname: 'localhost',
    port: 3000,
    path: '/MongoDB/logs',
    debug: false
  }
}
