const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    perusahaan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profesi: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    telepon: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    isSubscribe: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    Activatedtoken: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
