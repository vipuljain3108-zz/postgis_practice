module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("vipuls", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.FLOAT
    },
    longitude: {
      type: Sequelize.FLOAT
    },
    location:{
      type: Sequelize.GEOGRAPHY
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};