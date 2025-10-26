module.exports = (sequelize, Sequelize) => {
  const persoons_gegevens = sequelize.define("persoons_gegevens", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    naam: {
      type: Sequelize.STRING
    },
    voornamen: {
      type: Sequelize.STRING
    },
    geboorte_datum: {
      type: Sequelize.DATEONLY
    },
    id_nummer: {
      type: Sequelize.STRING
    },
    geboorte_tijd: {
      type: Sequelize.TIME
    },
    ingevoerd_door_persoons_gegevens_id: {
      type: Sequelize.INTEGER
    },
    gewijzigd_door_persoons_gegevens_id: {
      type: Sequelize.INTEGER
    },
    datum_ingevoerd: {
      type: Sequelize.DATE
    },
    datum_gewijzigd: {
      type: Sequelize.DATE
    },
    geslacht_id: {
      type: Sequelize.INTEGER
    },
    burgerlijke_staat_id: {
      type: Sequelize.INTEGER
    },
    datum_van_overlijden: {
      type: Sequelize.DATEONLY
    }
  });

  persoons_gegevens.associate = function(models) {
    // Self-referencing associations for ingevoerd_door and gewijzigd_door
    persoons_gegevens.belongsTo(models.persoons_gegevens, {
      foreignKey: 'ingevoerd_door_persoons_gegevens_id',
      as: 'ingevoerd_door'
    });
    
    persoons_gegevens.belongsTo(models.persoons_gegevens, {
      foreignKey: 'gewijzigd_door_persoons_gegevens_id',
      as: 'gewijzigd_door'
    });

    // Association with geslacht
    persoons_gegevens.belongsTo(models.geslacht, {
      foreignKey: 'geslacht_id',
      as: 'geslacht'
    });

    // Association with burgerlijke_staat
    persoons_gegevens.belongsTo(models.burgerlijke_staat, {
      foreignKey: 'burgerlijke_staat_id',
      as: 'burgerlijke_staat'
    });

    // Has many logs
    persoons_gegevens.hasMany(models.persoons_gegevens_log, {
      foreignKey: 'persoons_gegevens_id',
      as: 'logs'
    });
  };

  return persoons_gegevens;
};