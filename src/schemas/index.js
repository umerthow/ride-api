const rdOrder = require('./rd_order')
const rdOrderItem = require('./rd_order_items')

// Relationship
rdOrder.hasMany(rdOrderItem, { as: 'items', foreignKey: 'order_id' });
rdOrderItem.hasOne(rdOrder, { foreignKey: 'id' });
rdOrderItem.hasMany(rdOrderItem, { foreignKey: 'driver_code' } )


module.exports = {
  rdOrder,
  rdOrderItem
};
