module.exports = (sequelize, Sequelize) => {
  const adres = sequelize.define("adressen", {
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
    wijken_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    distrikten_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    landen_id: {
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
      foreignKey: 'wijken_id',
      as: 'wijk'
    });
    adres.belongsTo(models.distrikten, {
      foreignKey: 'distrikten_id',
      as: 'distrikt'
    });
    adres.belongsTo(models.landen, {
      foreignKey: 'landen_id',
      as: 'land'
    });
    adres.hasMany(models.verblijven, {
      foreignKey: 'adressen_id',
      as: 'verblijven'
    });
  };

  return adres;
};
