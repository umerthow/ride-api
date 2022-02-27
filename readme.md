## Rida - Order API
Simple API to create order and assign driver by Ahmad Umar.
#### Note(*) : this api for test purpose


## Requirement
   - NodeJS min. v14
   - MySQL v5.6

## Installation
   `$ npm install`


## Running dev
1.  Please make sure have set of `.env` configuration in root folder

 ```
 DB_NAME=your_db_name
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
```

  2.  $ npm run dev
   ```
   [nodemon] 2.0.13
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
running..
   ```

## Running test case
   $ npm run test

```
 > rida-api@1.0.0 test 


  Order Assignment
    ✔ Should assign item to driver
    ✔ Should return error not found

  Order Creation
    ✔ Should order created
    ✔ Should order created valid same vehicle type

  Order List
    ✔ Should get list order
    ✔ Should get list order group by driver
    ✔ Should get list order group by specified driver


  7 passing (20ms)
```

## Directory Structure

- `/src` If you are Express user, this is the directory where you should perform your development.
- `/test` This directory contains the unit test case for module or core function.


## API Usage
#### Create Order
- POST `/order` 
- payload :
``` JSON
{
    "pickupTime": "2022-02-28 22:45:00",
    "vehicleType": "BIKE",
    "wayPoints": [
        {
            "serviceType": "PICK_UP",
            "address": "Jl FG Meruyung ",
            "location": {
                "latitude": "123.455",
                "longitude": "-923.93"
            },
            "name": "George William 5",
            "phone": "+629938848",
            "notes": " near school"
        },
          {
            "serviceType": "PICK_UP",
            "address": "Jl AC Meruyung ",
            "location": {
                "latitude": "523.920",
                "longitude": "-123.31"
            },
            "name": "George William 7",
            "phone": "+629938848",
            "notes": " near school"
        }
    ]
}
```

- response:
```
{
    "success": true,
    "data": {
        "id": 12,
        "pickup_time": "2022-02-28T15:45:00.000Z",
        "vehicle_type": "BIKE",
        "updated_at": "2022-02-27T02:10:58.920Z",
        "created_at": "2022-02-27T02:10:58.920Z"
    },
    "message": "success create order"
}
```

#### Assign Driver
- POST `/orders/:id/assign-driver` 
- Param:
    - id: OrderId (Int)

- payload :
 ``` JSON
{
    "orderItemId": 9,
    "driverCode": "BV5MXZ-125"
}
```

- response:
```
{
    "success": true,
    "data": [
        1
    ],
    "message": "success assigning order"
}
```

#### Group list order by each driver
- GET `/orders/group`
- query string: 
  - driverCode (String) (Optional)
- response:
```
{
    "success": true,
    "data": [
        {
            "driver_code": "BV5MXZ-124",
            "items": [
                {
                    "id": 6,
                    "order_id": 7,
                    "service_type": "PICK_UP",
                    "address": "Jl nanas no 1 Boyolali, Rt 1",
                    "latitude": 123.455,
                    "longitude": 123.455,
                    "name": "George Will",
                    "phone": "+629938848",
                    "notes": " number 1 beside school",
                    "driver_code": "BV5MXZ-124",
                    "created_at": "2022-02-27T00:26:37.000Z",
                    "updated_at": "2022-02-27T00:32:40.000Z"
                },
                {
                    "id": 7,
                    "order_id": 8,
                    "service_type": "PICK_UP",
                    "address": "Jl Brawijaya II",
                    "latitude": 1243.455,
                    "longitude": 98.33,
                    "name": "Samudra Akasha",
                    "phone": "+625938848",
                    "notes": " nearby Office",
                    "driver_code": "BV5MXZ-124",
                    "created_at": "2022-02-27T02:02:56.000Z",
                    "updated_at": "2022-02-27T02:11:12.000Z"
                }
            ]
        }
    ],
    "message": "success retrieve orders group"
}
```

#### List Orders
- GET `/orders`
- response: 
```
{
    "success": true,
    "data": [
        {
            "id": 12,
            "pickup_time": "2022-02-28T15:45:00.000Z",
            "vehicle_type": "BIKE",
            "created_at": "2022-02-27T02:10:58.000Z",
            "updated_at": "2022-02-27T02:10:58.000Z",
            "items": [
                {
                    "id": 11,
                    "order_id": 12,
                    "service_type": "PICK_UP",
                    "address": "Jl FG Meruyunh ",
                    "latitude": 123.455,
                    "longitude": 123.455,
                    "name": "George Will",
                    "phone": "+629938848",
                    "notes": " near school",
                    "driver_code": null,
                    "created_at": "2022-02-27T02:10:59.000Z",
                    "updated_at": "2022-02-27T02:10:59.000Z"
                },
                {
                    "id": 12,
                    "order_id": 12,
                    "service_type": "PICK_UP",
                    "address": "Jl AC Meruyunh ",
                    "latitude": 123.455,
                    "longitude": 123.455,
                    "name": "George Will",
                    "phone": "+629938848",
                    "notes": " near school",
                    "driver_code": null,
                    "created_at": "2022-02-27T02:10:59.000Z",
                    "updated_at": "2022-02-27T02:10:59.000Z"
                }
            ]
        },
        {
            "id": 11,
            "pickup_time": "2022-02-28T15:45:00.000Z",
            "vehicle_type": "BIKE",
            "created_at": "2022-02-27T02:03:34.000Z",
            "updated_at": "2022-02-27T02:03:34.000Z",
            "items": [
                {
                    "id": 10,
                    "order_id": 11,
                    "service_type": "PICK_UP",
                    "address": "Jl Widi Meruyunh ",
                    "latitude": 123.455,
                    "longitude": 123.455,
                    "name": "George Will",
                    "phone": "+629938848",
                    "notes": " near school",
                    "driver_code": null,
                    "created_at": "2022-02-27T02:03:34.000Z",
                    "updated_at": "2022-02-27T02:03:34.000Z"
                }
            ]
        }
    ],
    "message": "success retrieve orders"
}
```