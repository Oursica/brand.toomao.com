
if (process.env.NODE_ENV === 'production') {

  console.log('api.js exports production env.')
  module.exports = {
    baseApi: "https://api.toomao.com/1.1/system",
    imageApi: "https://api.toomao.com/1.1/images",
    rootApi: "https://api.toomao.com",

    DEBUG: false,
    testEnvironment: false,
    ueditor: {
      hostname: 'common.toomao.com',
      port: 80
    }
  }
} else {
  console.log('api.js exports local env. LOCAL!!');

  module.exports = {
    // baseApi: "http://192.168.1.107:8090/toomao-api/1.1/system",
    // imageApi: "http://192.168.1.107:8090/toomao-api/1.1/images",
    // rootApi: "http://192.168.1.107:8090/toomao-",

    baseApi: "https://dev-api.toomao.com/1.1/system",
    imageApi: "https://dev-api.toomao.com/1.1/images",
    rootApi: "https://dev-api.toomao.com",
    /*testApi:"http://192.168.1.124:8080/toomao-api/1.1/giftCard",*/

    DEBUG: true,
    testEnvironment: true,
    baseOrder: "local",
    ueditor: {
      hostname: 'dev-common.toomao.com',
      port: 80
    }

  }
}
