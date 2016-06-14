
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('Statistics', {

      id              : { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      date            : DataTypes.DATE,
      user_total      : DataTypes.BIGINT,
      user_increase   : DataTypes.BIGINT,

      event_total     : DataTypes.BIGINT,
      event_increase  : DataTypes.BIGINT,

      product_total   : DataTypes.BIGINT,
      product_increase: DataTypes.BIGINT,

      cate_total      : DataTypes.BIGINT,
      cate_increase   : DataTypes.BIGINT,

      shop_total      : DataTypes.BIGINT,
      shop_increase   : DataTypes.BIGINT

    }, {
        // don't need timestamp attributes for this model
        timestamps: true,
        underscored: true,
        tableName: "statistics",
        createdAt: "date_created",
        updatedAt: "last_updated"
    });

};
