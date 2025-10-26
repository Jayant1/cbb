module.exports = (sequelize, Sequelize) => {
  const functies = sequelize.define("functies", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    omschrijving: {
      type: Sequelize.STRING
    }
  });

  functies.associate = function(models) {
    // Has many medewerkers
    functies.hasMany(models.medewerker, {
      foreignKey: 'functie_id',
      as: 'medewerkers'
    });
  };

  return functies;
};
