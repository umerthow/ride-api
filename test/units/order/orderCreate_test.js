const OrderInstance = require('../../../src/services/order')
const Order = new OrderInstance()
const { rdOrder, rdOrderItem } = require('../../../src/schemas/index')
const { expect } = require('chai')
const sinon = require('sinon')
const { scenario01 } = require('../../scenario/order/orderCreate_case')
describe('Order Case', () => {

  let sandbox = null
  let rdOrderStub = null
  let rdOrderItemStub = null

  before(() => {
    sandbox = sinon.createSandbox()
    rdOrderStub = sinon.stub(rdOrder, 'create')
    rdOrderItemStub = sinon.stub(rdOrderItem, 'bulkCreate')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should order created', async () => {
    rdOrderStub.returns().resolves(scenario01.result)
    rdOrderItemStub.resolves(true)
    const payload = scenario01.body

    const result = await Order.createOrder(payload)
    expect(result.data.id).to.eq(scenario01.result.id);
  })

  it('Should order created valid same vehicle type', async () => {
    rdOrderStub.returns().resolves(scenario01.result)
    rdOrderItemStub.resolves(true)
    const payload = scenario01.body

    const result = await Order.createOrder(payload)
    expect(payload.vehicleType).to.eq(scenario01.result.dataValues.vehicle_type);
  })
})