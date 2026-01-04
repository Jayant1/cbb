module.exports = (sequelize, Sequelize) => {
  const burgerlijke_staat_historie = sequelize.define("burgerlijke_staat_historie", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    persoon_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    burgerlijke_staat: {
      type: Sequelize.ENUM('ongehuwd', 'gehuwd', 'gescheiden', 'weduwe_weduwnaar', 'geregistreerd_partnerschap'),
      allowNull: false
    },
    wijzigingsdatum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    akte_nummer: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    plaats_registratie: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  });

  burgerlijke_staat_historie.associate = function(models) {
    burgerlijke_staat_historie.belongsTo(models.persoon, {
      foreignKey: 'persoon_id',
      as: 'persoon'
    });
  };

  return burgerlijke_staat_historie;
};
