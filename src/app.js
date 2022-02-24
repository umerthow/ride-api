const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const OrderRoutes = require('./routes')


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

// health-check
app.get('/', function (req, res, next) {
  res.json({
    status: 'OK',
  });
});


app.use('/', OrderRoutes)

// falltrough 404
app.use((req, res, next) => {
  res.status(404)
  res.send({
    message: 'Api not found'
  })
})

// error handler
app.use(function onError(err, req, res, next) {
  res
    .status(500)
    .send({
      error: true,
      message: err.message,
    })
    .end();
  console.error(err);
});


module.exports = app;