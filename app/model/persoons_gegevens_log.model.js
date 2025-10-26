module.exports = (sequelize, Sequelize) => {
  const persoons_gegevens_log = sequelize.define("persoons_gegevens_log", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    opmerking: {
      type: Sequelize.TEXT
    },
    persoons_gegevens_id: {
      type: Sequelize.INTEGER
    },
    ingevoerd_door_persoons_gegevens_id: {
      type: Sequelize.INTEGER
    },
    datum_ingevoerd: {
      type: Sequelize.DATE
    },
    type_mutaties_id: {
      type: Sequelize.INTEGER
    }
  });

  persoons_gegevens_log.associate = function(models) {
    // Association with persoons_gegevens
    persoons_gegevens_log.belongsTo(models.persoons_gegevens, {
      foreignKey: 'persoons_gegevens_id',
      as: 'persoons_gegevens'
    });

    // Association with persoons_gegevens for ingevoerd_door
    persoons_gegevens_log.belongsTo(models.persoons_gegevens, {
      foreignKey: 'ingevoerd_door_persoons_gegevens_id',
      as: 'ingevoerd_door'
    });

    // Association with type_mutaties
    persoons_gegevens_log.belongsTo(models.type_mutaties, {
      foreignKey: 'type_mutaties_id',
      as: 'type_mutatie'
    });
  };

  return persoons_gegevens_log;
};
