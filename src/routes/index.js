const express = require('express')
const Router = express.Router()
const orderController = require('../controllers/orderController')
const validator = require('../validators/formOrder')

Router.post('/orders',validator.create, orderController.createOrder)
Router.get('/orders', orderController.getList)
Router.post('/orders/:id/assign-driver',validator.assigning, orderController.assignOrder)
Router.get('/orders/group', orderController.getGroupList)
Router.get('/orders/group-list', orderController.groupOrder)
module.exports = Router

