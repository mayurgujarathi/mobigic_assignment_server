const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const dbconfig = require('../../config/dbconfig');

const db = {};

sequelize = new Sequelize('mobigic_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  operatorsAliases: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false
  }
})

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// 'use strict';
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// // const config = require(__dirname + '/../config/config.json')[env];
// const config = require('../../config/dbconfig');

// const db = {};

// let sequelize;
// if (env === 'TEST') {
//   sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
//     host: config.test.host,
//     dialect: config.test.dialect,
//     operatorsAliases: true,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: process.env.DB_POOL_ACQUIRE,
//       idle: process.env.DB_POOL_IDLE,
//     },
//     define: {
//       timestamps: false
//     }
//   });
// } else {
//   // sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, config.development);
//   sequelize = new Sequelize(config.database, config.userName, config.password, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3307,
//     operatorsAliases: true,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: process.env.DB_POOL_ACQUIRE,
//       idle: process.env.DB_POOL_IDLE,
//     },
//     define: {
//       timestamps: false
//     }
//   })
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;