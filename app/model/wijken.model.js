module.exports = (sequelize, Sequelize) => {
  const wijken = sequelize.define("wijken", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    distrikt_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    wijk_code: {
      type: Sequelize.STRING(10),
      unique: true,
      allowNull: false
    },
    wijknaam: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  });

  wijken.associate = function(models) {
    wijken.belongsTo(models.distrikten, {
      foreignKey: 'distrikt_id',
      as: 'distrikt'
    });
    wijken.hasMany(models.adres, {
      foreignKey: 'wijk_id',
      as: 'adressen'
    });
  };

  return wijken;
};
