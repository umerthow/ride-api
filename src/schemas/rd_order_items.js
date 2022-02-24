const Sequelize = require('sequelize');
const db = require('../configs/db');

const rdOrderItem = db.define('rd_order_item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: { type: Sequelize.INTEGER },
  service_type: { type: Sequelize.STRING },
  address: { type: Sequelize.TEXT },
  latitude: { type: Sequelize.FLOAT },
  longitude: { type: Sequelize.FLOAT },
  name: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  notes: { type: Sequelize.TEXT },
  is_get_driver: { type: Sequelize.SMALLINT },
  taken_by: { type: Sequelize.STRING },
  created_at: { type: Sequelize.DATE },
  updated_at: { type: Sequelize.DATE }
},
{
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  freezeTableName: true
});

module.exports = rdOrderItem;
