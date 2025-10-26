module.exports = (sequelize, Sequelize) => {
  const medewerker = sequelize.define("medewerker", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_nummer: {
      type: Sequelize.STRING
    },
    functie_id: {
      type: Sequelize.INTEGER
    },
    datum_in_dienst_treding: {
      type: Sequelize.DATEONLY
    },
    datum_uit_dienst_treding: {
      type: Sequelize.DATEONLY
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
    }
  });

  medewerker.associate = function(models) {
    // Association with functies
    medewerker.belongsTo(models.functies, {
      foreignKey: 'functie_id',
      as: 'functie'
    });

    // Association with persoons_gegevens for ingevoerd_door
    medewerker.belongsTo(models.persoons_gegevens, {
      foreignKey: 'ingevoerd_door_persoons_gegevens_id',
      as: 'ingevoerd_door'
    });

    // Association with persoons_gegevens for gewijzigd_door
    medewerker.belongsTo(models.persoons_gegevens, {
      foreignKey: 'gewijzigd_door_persoons_gegevens_id',
      as: 'gewijzigd_door'
    });
  };

  return medewerker;
};
