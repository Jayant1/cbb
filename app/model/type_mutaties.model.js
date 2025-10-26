module.exports = (sequelize, Sequelize) => {
  const type_mutaties = sequelize.define("type_mutaties", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    omschrijving: {
      type: Sequelize.STRING
    }
  });

  type_mutaties.associate = function(models) {
    // Has many persoons_gegevens_log
    type_mutaties.hasMany(models.persoons_gegevens_log, {
      foreignKey: 'type_mutaties_id',
      as: 'logs'
    });
  };

  return type_mutaties;
};
