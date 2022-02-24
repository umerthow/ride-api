const rdOrder = require('./rd_order')
const rdOrderItem = require('./rd_order_items')

// Relationship
rdOrder.hasMany(rdOrderItem, { as: 'items', foreignKey: 'order_id' });

module.exports = {
  rdOrder,
  rdOrderItem
};
