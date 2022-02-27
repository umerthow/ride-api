const OrderInstance = require('../../../src/services/order')
const Order = new OrderInstance()
const { rdOrder, rdOrderItem } = require('../../../src/schemas/index')
const { expect } = require('chai')
const sinon = require('sinon')
const { listCase1, listCase2 } = require('../../scenario/order/orderList_case')

describe('Order List', () => {
  let sandbox = null
  let rdOrderStub = null
  let rdOrderItemStub = null
  let orderServiceStub = null

  afterEach(() => {
    sandbox.restore()
  })

  before(() => {
    sandbox = sinon.createSandbox()
    rdOrderStub = sinon.stub(rdOrder, 'findAll')
    rdOrderItemStub = sinon.stub(rdOrderItem, 'findAll')
    orderServiceStub = sinon.stub(Order, 'getItemsByDriver')
  })

  it('Should get list order', async () => {
    rdOrderStub.returns().resolves(listCase1.result)
    const result = await Order.getListOrder()
    expect(result).to.haveOwnProperty('success')
    expect(result).to.haveOwnProperty('data')
    expect(result.success).to.eq(listCase1.response.success)
  })

  it('Should get list order group by driver', async () => {
    const { params } = listCase2

    rdOrderItemStub.returns().resolves(listCase2.response.findAll)
    orderServiceStub.returns().resolves(listCase2.response.getItemsByDriver)

    const result = await Order.getListOrderGroup()

    expect(result).to.haveOwnProperty('success')
    expect(result).to.haveOwnProperty('data')
    expect(result.data).to.be.an('array')
    expect(result.success).to.eq(listCase2.response.result.success)
  })

  it('Should get list order group by specified driver', async () => {
    const { params } = listCase2

    rdOrderItemStub.returns().resolves(listCase2.response.findAll)
    orderServiceStub.returns().resolves(listCase2.response.getItemsByDriver)

    const result = await Order.getListOrderGroup(params)
    const { data } = result
    expect(data).to.be.an('array')

    const driver = data.pop()

    expect(driver).to.haveOwnProperty('driver_code')
    expect(driver.driver_code).to.eq(listCase2.response.result.data[0].driver_code)
  })

})