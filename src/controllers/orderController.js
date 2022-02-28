const OrderInstance = require('../services/order')

const createOrder = async (req, res, next) => {
  try {
    const { body } = req
    const Order = new OrderInstance()
    const result = await Order.createOrder(body)
    const { success, message, errorCode = 400 } = result
    if (!success) {
      return res
        .status(errorCode)
        .json({
          status: errorCode,
          message
        })
    }

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

const assignOrder = async (req, res, next) => {
  try {
    const { body, params } = req
    const { id: orderId} = params

    const Order = new OrderInstance()
    const result = await Order.assignOrder(orderId, body)
    const { success, message, statusCode = 400,  } = result
    if (!success) {
      return res
        .status(statusCode)
        .json({
          statusCode: statusCode,
          message
        })
    }

    return res.json(result)
  } catch (error) {
    next(error)
  }
}

const getList = async (req, res, next) => {
  try {
    const Order = new OrderInstance()
    const result = await Order.getListOrder()
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const getGroupList = async (req, res, next) => {
  try {
    const { query } = req
    const Order = new OrderInstance()
    const result = await Order.getListOrderGroup(query)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createOrder,
  assignOrder,
  getList,
  getGroupList
}