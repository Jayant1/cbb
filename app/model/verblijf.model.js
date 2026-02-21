module.exports = (sequelize, Sequelize) => {
  const verblijf = sequelize.define("verblijven", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    personen_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    adressen_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    inschrijvingsdatum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    uitschrijvingsdatum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    verblijf_type: {
      type: Sequelize.ENUM('hoofdverblijf', 'domicilie', 'bijadres'),
      allowNull: false
    },
    is_actief: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  verblijf.associate = function(models) {
    verblijf.belongsTo(models.personen, {
      foreignKey: 'personen_id',
      as: 'persoon'
    });
    verblijf.belongsTo(models.adressen, {
      foreignKey: 'adressen_id',
      as: 'adres'
    });
  };

  return verblijf;
};
