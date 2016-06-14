
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('WechatConfig', {

      id              : { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      key             : DataTypes.STRING,
      value           : DataTypes.STRING

    }, {
        // don't need timestamp attributes for this model
        timestamps: true,
        underscored: true,
        tableName: "wechat_config",
        createdAt: "date_created",
        updatedAt: "last_updated"
    });

};
