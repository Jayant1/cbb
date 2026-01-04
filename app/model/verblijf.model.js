module.exports = (sequelize, Sequelize) => {
  const verblijf = sequelize.define("verblijf", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    persoon_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    adres_id: {
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
    verblijf.belongsTo(models.persoon, {
      foreignKey: 'persoon_id',
      as: 'persoon'
    });
    verblijf.belongsTo(models.adres, {
      foreignKey: 'adres_id',
      as: 'adres'
    });
  };

  return verblijf;
};
