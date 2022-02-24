const {
  rdOrder, rdOrderItem
} = require('../schemas');

class Order {
  /**
   *
   * Create an Order
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async createOrder(data) {
    const { pickupTime: pickup_time, vehicleType: vehicle_type, wayPoints } = data

    const payload = {
      pickup_time,
      vehicle_type
    }

    const orderHeader = await rdOrder.create(payload)
    const payloadItems = await Promise.all(wayPoints.map(item => {
      return {
        order_id: orderHeader.id,
        service_type: item.serviceType,
        address: item.address,
        latitude: item.location.latitude,
        longitude: item.location.latitude,
        name: item.name,
        phone: item.phone,
        notes: item.notes
      }
    }))

    await rdOrderItem.bulkCreate(payloadItems)
    return {
      success: true,
      data: orderHeader,
      message: 'success create order'
    }
  }

  async getListOrder() {

  }

  async getListOrderByDriver() {

  }
}

module.exports = Order