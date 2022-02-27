module.exports = {
  listCase1: {
    result: [{
      id: 19348,
      pickup_time: "2022-02-28T15:45:00.000Z",
      vehicle_type: "BIKE",
      updated_at: "2022-02-24T03:24:31.432Z",
      created_at: "2022-02-24T03:24:31.432Z",
      items: [{
        id: 1
      }]
    }],
    response: {
      success: true,
      data: [{
        id: 19348
      }],
      message: 'success retrieve orders'
    }
  },
  listCase2: {
    params: {
      driverCode: 'AAAA-124',
    },
    response: {
      findAll: [
        {
          driver_code: 'AAAA-124'
        }
      ],
      getItemsByDriver: [
        {
          id: 6,
          order_id: 7,
          service_type: 'PICK_UP',
          driver_code: 'AAAA-124',
        },
        {
          id: 7,
          order_id: 8,
          service_type: "PICK_UP",
          driver_code: 'AAAA-124',
        }
      ],
      result: {
        success: true,
        data: [
          {
            driver_code: 'AAAA-124',
            items: [
              {
                id: 6,
                order_id: 7,
                service_type: 'PICK_UP',
                driver_code: 'AAAA-124',
              },
              {
                id: 7,
                order_id: 8,
                service_type: "PICK_UP",
                driver_code: 'AAAA-124',
              }
            ]
          }
        ],
        message: "success retrieve orders group"
      }
    }
  }
};