const Joi = require('joi')
const { errorCode, httpStatus } = require('../configs/constant')

const validateOrder = {
  create: async (req, res, next) => {
    try {

      const schema = Joi.object({
        pickupTime: Joi.date().iso().required(),
        vehicleType: Joi.string().valid('BIKE', 'CAR', 'MINIVAN'),
        wayPoints: Joi.array().items({
          serviceType: Joi.string().valid('PICK_UP'),
          address: Joi.string().required(),
          location: Joi.object({
            longitude: Joi.number(),
            latitude: Joi.number()
          }),
          name: Joi.string().required(),
          phone: Joi.string().required(),
          notes: Joi.optional()
        }).required()
      })

      const { error } = await schema.validate(req.body)

      if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
      }
      next()
    } catch (error) {
      res.status(httpStatus.badRequest).send({
        error: true,
        errorCode: errorCode.VALIDATION_ERROR,
        message: error.message
      });
    }
  },
  assigning: async (req, res, next) => {
    try {
      const schema = Joi.object({
        orderItemId: Joi.number().required(),
        driverCode: Joi.string().alphanum().required().max(20)
      })

      const { error } = await schema.validate(req.body)
      
      if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
      }
      next()


    } catch (error) {
      res.status(httpStatus.badRequest).send({
        error: true,
        errorCode: errorCode.VALIDATION_ERROR,
        message: error.message
      });
    }
  }
}

module.exports = validateOrder