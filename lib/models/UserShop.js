
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('UserShop', {

      id          : { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      handlerid   : DataTypes.BIGINT,
      // may be uuid
      userid      : DataTypes.STRING,
      username    : DataTypes.STRING,
      // may be uuid
      shopid      : DataTypes.STRING,
      shopname    : DataTypes.STRING,
      note        : DataTypes.STRING
    }, {
        // don't need timestamp attributes for this model
        timestamps: true,
        underscored: true,
        tableName: "user_shop",
        createdAt: "date_created",
        updatedAt: "last_updated"
    });

};
