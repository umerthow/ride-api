const OrderInstance = require('../../../src/services/order')
const Order = new OrderInstance()
const { rdOrder, rdOrderItem } = require('../../../src/schemas/index')
const { expect } = require('chai')
const sinon = require('sinon')
const { case1, case2 } = require('../../scenario/order/orderAssign_case')

describe('Order Assignment', () => {
  let sandbox = null
  let rdOrderStub = null
  let rdOrderItemStub = null

  afterEach(() => {
    sandbox.restore()
  })

  before(() => {
    sandbox = sinon.createSandbox()
    rdOrderStub = sinon.stub(rdOrder, 'findOne')
    rdOrderItemStub = sinon.stub(rdOrderItem, 'update')
  })

  it('Should assign item to driver', async () => {
    rdOrderStub.returns().resolves(case1.result.findOrder)
    rdOrderItemStub.resolves([1])

    const { params, body } = case1
    const result = await Order.assignOrder(params.orderId, body)
    expect(result.success).to.eq(case1.result.response.success);
  })

  it('Should return error not found', async () => {
    rdOrderStub.returns().resolves(null)
    rdOrderItemStub.resolves([1])

    const { params, body } = case2
    const result = await Order.assignOrder(params.orderId, body)
    expect(result.success).to.eq(case2.result.succes);

  })


})