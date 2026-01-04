module.exports = (sequelize, Sequelize) => {
  const adres = sequelize.define("adres", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    straatnaam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    huisnummer: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    toevoeging: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    wijk_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    distrikt_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    land_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    adres_type: {
      type: Sequelize.ENUM('hoofdverblijf', 'briefadres', 'historisch'),
      allowNull: false
    }
  });

  adres.associate = function(models) {
    adres.belongsTo(models.wijken, {
      foreignKey: 'wijk_id',
      as: 'wijk'
    });
    adres.belongsTo(models.distrikten, {
      foreignKey: 'distrikt_id',
      as: 'distrikt'
    });
    adres.belongsTo(models.landen, {
      foreignKey: 'land_id',
      as: 'land'
    });
    adres.hasMany(models.verblijf, {
      foreignKey: 'adres_id',
      as: 'verblijven'
    });
  };

  return adres;
};
