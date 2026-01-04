module.exports = (sequelize, Sequelize) => {
  const audit_log = sequelize.define("audit_log", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tabel_naam: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    record_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    actie_type: {
      type: Sequelize.ENUM('INSERT', 'UPDATE', 'DELETE'),
      allowNull: false
    },
    oude_waarde: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    nieuwe_waarde: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    gebruiker: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    tijdstip: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    ip_adres: {
      type: Sequelize.STRING(45),
      allowNull: true
    }
  });

  return audit_log;
};
