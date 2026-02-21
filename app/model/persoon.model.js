module.exports = (sequelize, Sequelize) => {
  const persoon = sequelize.define("personen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
    },
    voornamen: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    achternaam: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    geboortedatum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    geboorteplaats: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    landen_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    geslacht: {
      type: Sequelize.ENUM('M', 'V', 'X'),
      allowNull: false
    },
    burgerlijke_staat: {
      type: Sequelize.ENUM('ongehuwd', 'gehuwd', 'gescheiden', 'weduwe_weduwnaar', 'geregistreerd_partnerschap'),
      allowNull: false
    },
    nationaliteiten_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    overlijdensdatum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    overlijdensplaats: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    datum_aanmaak: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    datum_laatste_wijziging: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  persoon.associate = function(models) {
    persoon.belongsTo(models.landen, {
      foreignKey: 'landen_id',
      as: 'geboorteland'
    });
    persoon.belongsTo(models.nationaliteiten, {
      foreignKey: 'nationaliteiten_id',
      as: 'nationaliteit'
    });
    persoon.hasMany(models.verblijven, {
      foreignKey: 'personen_id',
      as: 'verblijven'
    });
    persoon.hasMany(models.documenten, {
      foreignKey: 'personen_id',
      as: 'documenten'
    });
    persoon.hasMany(models.nationaliteit_historie, {
      foreignKey: 'personen_id',
      as: 'nationaliteit_historie'
    });
    persoon.hasMany(models.burgerlijke_staat_historie, {
      foreignKey: 'personen_id',
      as: 'burgerlijke_staat_historie'
    });
  };

  return persoon;
};
