module.exports = (sequelize, Sequelize) => {
  const nationaliteit_historie = sequelize.define("nationaliteit_historie", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    persoon_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nationaliteit_id: {
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
    nationaliteit_historie.belongsTo(models.persoon, {
      foreignKey: 'persoon_id',
      as: 'persoon'
    });
    nationaliteit_historie.belongsTo(models.nationaliteiten, {
      foreignKey: 'nationaliteit_id',
      as: 'nationaliteit'
    });
  };

  return nationaliteit_historie;
};
