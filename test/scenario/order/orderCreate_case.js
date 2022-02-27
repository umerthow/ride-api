module.exports = {
  scenario01: {
    body: {
      pickupTime: "2022-02-28 22:45:00",
      vehicleType: "BIKE",
      wayPoints: [
        {
          serviceType: "PICK_UP",
          address: "loremp ipsum dolor",
          location: {
            latitude: "123.455",
            longitude: "-923.93"
          },
          name: "Jhon doe",
          phone: "+62111",
          notes: "Loremp ipsum dolor"
        }
      ]
    },
    result: {
      dataValues: {
        id: 19348,
        pickup_time: "2022-02-28T15:45:00.000Z",
        vehicle_type: "BIKE",
        updated_at: "2022-02-24T03:24:31.432Z",
        created_at: "2022-02-24T03:24:31.432Z"
      },
    },
  },
};