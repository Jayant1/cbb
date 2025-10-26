module.exports = (sequelize, Sequelize) => {
  const geslacht = sequelize.define("geslacht", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    omschrijving: {
      type: Sequelize.STRING
    }
  });

  geslacht.associate = function(models) {
    // Has many persoons_gegevens
    geslacht.hasMany(models.persoons_gegevens, {
      foreignKey: 'geslacht_id',
      as: 'personen'
    });
  };

  return geslacht;
};
