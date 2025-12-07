const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const medewerkers = sequelize.define("medewerkers", {
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
    },
    gebruikers_naam: {
      type: Sequelize.STRING,
      unique: true
    },
    wachtwoord: {
      type: Sequelize.STRING
    }
  }, {
    hooks: {
      beforeCreate: async (medewerker) => {
        if (medewerker.wachtwoord) {
          const salt = await bcrypt.genSalt(10);
          medewerker.wachtwoord = await bcrypt.hash(medewerker.wachtwoord, salt);
        }
      },
      beforeUpdate: async (medewerker) => {
        if (medewerker.changed('wachtwoord')) {
          const salt = await bcrypt.genSalt(10);
          medewerker.wachtwoord = await bcrypt.hash(medewerker.wachtwoord, salt);
        }
      }
    }
  });

  // Method to compare password
  medewerkers.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.wachtwoord);
  };

  medewerkers.associate = function(models) {
    // Association with functies
    medewerkers.belongsTo(models.functies, {
      foreignKey: 'functie_id',
      as: 'functie'
    });

    // Association with persoons_gegevens for ingevoerd_door
    medewerkers.belongsTo(models.persoons_gegevens, {
      foreignKey: 'ingevoerd_door_persoons_gegevens_id',
      as: 'ingevoerd_door'
    });

    // Association with persoons_gegevens for gewijzigd_door
    medewerkers.belongsTo(models.persoons_gegevens, {
      foreignKey: 'gewijzigd_door_persoons_gegevens_id',
      as: 'gewijzigd_door'
    });
  };

  return medewerkers;
};
