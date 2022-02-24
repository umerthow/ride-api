const express = require('express')
const Router = express.Router()
const orderController = require('../controllers/orderController')
const validator = require('../validators/formOrder')

Router.post('/order',validator.create, orderController.createOrder)

module.exports = Router

