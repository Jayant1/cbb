module.exports = (sequelize, Sequelize) => {
  const nationaliteiten = sequelize.define("nationaliteiten", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nationaliteit_code: {
      type: Sequelize.STRING(3),
      unique: true,
      allowNull: false
    },
    nationaliteit_naam: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  });

  nationaliteiten.associate = function(models) {
    nationaliteiten.hasMany(models.personen, {
      foreignKey: 'nationaliteiten_id',
      as: 'personen'
    });
    nationaliteiten.hasMany(models.nationaliteit_historie, {
      foreignKey: 'nationaliteiten_id',
      as: 'historie'
    });
  };

  return nationaliteiten;
};
