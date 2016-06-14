if (process.env.NODE_ENV === 'production') {
  module.exports = {
    database: "toomao_web_admin",
    host    : "rds1jkkgtymho2jdgpgmepublic.mysql.rds.aliyuncs.com",
    username: "toomaoweb",
    password: "toomaoweb888"
  }
} else {
  module.exports = {
    database: "toomao_web_admin_test",
    host    : "rds1jkkgtymho2jdgpgmepublic.mysql.rds.aliyuncs.com",
    username: "toomaoweb",
    password: "toomaoweb888"
  }
}
