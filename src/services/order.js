const {
  rdOrder, rdOrderItem
} = require('../schemas');
const { Op } = require('sequelize')

class Order {
  /**
   *
   * Create an Order
   * @param {Object} data
   * @returns {Promise<{ success: Boolean, data: Object, message: String}>}
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

  /**
   *
   * Assign Order
   * @param {String} orderId
   * @param {Object} data
   * @returns {Promise<{ success: Boolean, data: Object, message: String}>}
   */
  async assignOrder(orderId, data) {

    const { orderItemId, driverCode } = data
    const findOrder = await rdOrder.findOne({
      where: {
        id: orderId
      },
      include: [{
        model: rdOrderItem,
        as: 'items',
        where: {
          id: orderItemId
        }
      }]
    })

    if (!findOrder) {
      return {
        succes: false,
        errorCode: 404,
        message: 'ORDER_NOT_FOUND'
      }
    }

    // Update Order
    const payload = {
      driver_code: driverCode
    }

    const result = await rdOrderItem.update(payload, {
      where: {
        id: orderItemId
      }
    })

    return {
      success: true,
      data: result,
      message: 'success assigning orders'
    }
  }

  /**
   * 
   * List Orders
   * @returns {Promise<{ success: Boolean, data: Object, message: String}>}
   */
  async getListOrder() {
    const orders = await rdOrder.findAll({
      include: [{
        as: 'items',
        model: rdOrderItem,
      }],
      order: [
        ['id', 'DESC']
      ]
    })
    return {
      success: true,
      data: orders,
      message: 'success retrieve orders'
    }
  }

  /**
   * 
   * List Orders Item by driverCode
   * @param {String} driverCode
   * @returns {Promise<Object>}
   */
  async getItemsByDriver(driverCode) {
    return await rdOrderItem.findAll({
      where: {
        driver_code: driverCode
      }
    })
  }

  /**
   * 
   * List Orders group by each driver
   * @param {Object} param
   * @returns {Promise<{ success: Boolean, data: Object, message: String}>}
   */
  async getListOrderGroup(param = {}) {

    const { driverCode } = param
    let whereItems = {}

    const query = {}

    if (driverCode) {
      whereItems = {
        driver_code: {
          [Op.eq]: driverCode
        }
      }
    }

    query.attributes = ['driver_code']
    query.where = {
      [Op.and]: {
        driver_code: {
          [Op.ne]: null
        },
        ...whereItems
      }
    }

    query.group = 'driver_code'

    const orderGroup = await rdOrderItem.findAll(query)

    const adjustmentOrderGroup = orderGroup.map(async item => {
      const { driver_code: drvCode } = item
      return {
        driver_code: drvCode,
        items: await this.getItemsByDriver(drvCode)
      }
    })

    const result = await Promise.all(adjustmentOrderGroup)

    return {
      success: true,
      data: result,
      message: 'success retrieve orders group'
    }
  }
}

module.exports = Order