const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sessions', {
    session_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Sessions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "session_id" },
        ]
      },
    ]
  });
};
