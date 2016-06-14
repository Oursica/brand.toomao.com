
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('WechatKeywords', {

      id              : { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      keyword         : DataTypes.STRING,
      type            : DataTypes.INTEGER,
      content         : DataTypes.STRING

    }, {
        // don't need timestamp attributes for this model
        timestamps: true,
        underscored: true,
        tableName: "wechat_keywords",
        createdAt: "date_created",
        updatedAt: "last_updated"
    });

};
