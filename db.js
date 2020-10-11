module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Jain@7503560505",
    DB: "sdb_course",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };