
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('User', {

      id          : { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      headimage   : DataTypes.STRING,
      mobile      : DataTypes.STRING(11),
      nickname    : DataTypes.STRING,
      password    : DataTypes.STRING,
      salt        : DataTypes.STRING(8),
      session_token: DataTypes.STRING,
      auth        : DataTypes.STRING

    }, {
        // don't need timestamp attributes for this model
        timestamps: true,
        underscored: true,
        tableName: "user",
        createdAt: "date_created",
        updatedAt: "last_updated"
    });

};
