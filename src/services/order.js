const {
  rdOrder, rdOrderItem
} = require('../schemas')
const { httpStatus } = require('../configs/constant')
const { Op } = require('sequelize')
const _ = require('lodash')

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
      statusCode: httpStatus.ok,
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
        statusCode: httpStatus.notFound,
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
      statusCode: httpStatus.ok,
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
      statusCode: httpStatus.ok,
      data: orders,
      message: 'success retrieve orders'
    }
  }

  /**
   * 
   * List Orders Item by driverCode
   * @param {String} driverCode
   * @param {number} orderId
   * @returns {Promise<Object>}
   */
  async getItemsByDriver(driverCode, orderId) {
    return await rdOrderItem.findAll({
      where: {
        order_id: orderId,
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

    query.attributes = ['driver_code', 'order_id']
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
      const { driver_code: drvCode, order_id: orderId } = item
      return {
        driver_code: drvCode,
        items: await this.getItemsByDriver(drvCode, orderId)
      }
    })

    const result = await Promise.all(adjustmentOrderGroup)

    return {
      success: true,
      statusCode: httpStatus.ok,
      data: result,
      message: 'success retrieve orders group'
    }
  }


  /**
   * 
   * List Orders group
   * @param {Object} param
   * @returns {Promise<{ success: Boolean, data: Object, message: String}>}
   */
  async getGroupOrderByEachDriver() {
    const orderItems = await rdOrderItem.findAll({
      attributes: ['order_id', 'driver_code'],
      order: [
        ['id', 'DESC']
      ]
    })


    const dataResult = []

    const groupOrder = _.groupBy(orderItems, 'driver_code')

    Object.keys(groupOrder).map((val) => {
      dataResult.push({
        driver_code: val,
        orders: _.uniqBy(groupOrder[val], 'order_id')
      })

      return dataResult
    })


    const transform = dataResult.map(async data => {
      const { orders } = data

      const adjustment = orders.map(async item => {
        const { order_id, driver_code } = item
        return {
          order_id,
          detail: await this.getItemsByDriver(driver_code, order_id)
        }
      })

      const promiseAdju = await Promise.all(adjustment)
      return data.orders = promiseAdju
    })


    await Promise.all(transform)

    return {
      success: true,
      statusCode: httpStatus.ok,
      data: dataResult,
      message: 'success retrieve orders group each driver'
    }
  }
}

module.exports = Order