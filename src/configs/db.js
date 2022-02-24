
require('dotenv').config()

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env

const Sequelize = require('sequelize');
const connectionMysql = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: 3306,
  logging: true,
})



module.exports = connectionMysql