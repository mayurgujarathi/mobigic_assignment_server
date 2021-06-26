module.exports = {
    userName: 'root',
    password: 'root',
    database: 'mobigic_db',
    host: 'localhost',
    dialect: 'mysql',
    define: {
      underscored: true
    },
    pool: {
      max: 5,
      idle: process.env.DB_POOL_IDLE,
      acquire: process.env.DB_POOL_ACQUIRE
    }
  };
  