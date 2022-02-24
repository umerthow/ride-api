const OrderInstance = require('../services/order')

const createOrder = async (req, res, next) => {
    try {
      const { body } = req
      const Order = new OrderInstance()
      const result = await Order.createOrder(body)
      res.json(result)
    } catch (error) {
      next(error)
    }
}

module.exports = {
  createOrder
}