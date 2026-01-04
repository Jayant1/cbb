module.exports = (sequelize, Sequelize) => {
  const document = sequelize.define("document", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    persoon_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    document_type: {
      type: Sequelize.ENUM('identiteitskaart', 'paspoort', 'verblijfsvergunning', 'rijbewijs'),
      allowNull: false
    },
    document_nummer: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false
    },
    uitgiftedatum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    vervaldatum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    uitgevende_instantie: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  });

  document.associate = function(models) {
    document.belongsTo(models.persoon, {
      foreignKey: 'persoon_id',
      as: 'persoon'
    });
  };

  return document;
};
