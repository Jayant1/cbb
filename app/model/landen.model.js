module.exports = (sequelize, Sequelize) => {
  const landen = sequelize.define("landen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    land_code: {
      type: Sequelize.STRING(3),
      unique: true,
      allowNull: false
    },
    landnaam: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  });

  landen.associate = function(models) {
    landen.hasMany(models.persoon, {
      foreignKey: 'geboorteland_id',
      as: 'personen'
    });
    landen.hasMany(models.adres, {
      foreignKey: 'land_id',
      as: 'adressen'
    });
  };

  return landen;
};
