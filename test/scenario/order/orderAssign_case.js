module.exports = {
  case1: {
    params: {
      orderId: 19348
    },
    body: {
      orderItemId: 9,
      driverCode: "DRIVER-125"
    },
    result: {
      findOrder: {
        dataValues: {
          id: 19348,
          pickup_time: "2022-02-28T15:45:00.000Z",
          vehicle_type: "BIKE",
          updated_at: "2022-02-24T03:24:31.432Z",
          created_at: "2022-02-24T03:24:31.432Z",
          items: []
        }
      },
      response: {
        success: true,
        data: [1],
        message: 'success assigning orders'
      }
    },
  },
  case2: {
    params: {
      orderId: 19347
    },
    body: {
      orderItemId: 9,
      driverCode: "DRIVER-124"
    },
    result: {
      success: false,
      errorCode: 404,
      message: 'ORDER_NOT_FOUND'
    }
  }
};