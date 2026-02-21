module.exports = (sequelize, Sequelize) => {
  const nationaliteit_historie = sequelize.define("nationaliteit_historie", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    personen_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nationaliteiten_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    verkrijgingsdatum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    verliesdatum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    verkrijgingswijze: {
      type: Sequelize.ENUM('geboorte', 'naturalisatie', 'huwelijk', 'optie', 'erkenning'),
      allowNull: false
    }
  });

  nationaliteit_historie.associate = function(models) {
    nationaliteit_historie.belongsTo(models.personen, {
      foreignKey: 'personen_id',
      as: 'persoon'
    });
    nationaliteit_historie.belongsTo(models.nationaliteiten, {
      foreignKey: 'nationaliteiten_id',
      as: 'nationaliteit'
    });
  };

  return nationaliteit_historie;
};
