const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('db_province_data', {
    province_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    province_name_en: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    province_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'db_province_data',
    timestamps: false
  });
};
