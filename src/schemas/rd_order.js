const Sequelize = require('sequelize');
const db = require('../configs/db');

const rdOrder = db.define('rd_order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pickup_time: { type: Sequelize.DATE },
  vehicle_type: { type: Sequelize.STRING },
  created_at: { type: Sequelize.DATE },
  updated_at: { type: Sequelize.DATE }
},
{
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  freezeTableName: true
});

module.exports = rdOrder;
