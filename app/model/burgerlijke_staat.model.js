module.exports = (sequelize, Sequelize) => {
  const burgerlijke_staat = sequelize.define("burgerlijke_staat", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    omschrijving: {
      type: Sequelize.STRING
    }
  });

  burgerlijke_staat.associate = function(models) {
    // Has many persoons_gegevens
    burgerlijke_staat.hasMany(models.persoons_gegevens, {
      foreignKey: 'burgerlijke_staat_id',
      as: 'personen'
    });
  };

  return burgerlijke_staat;
};
