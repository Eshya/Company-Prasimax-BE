const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('db_postal_code_data', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    urban: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sub_district: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    province_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'db_postal_code_data',
    timestamps: false
  });
};
