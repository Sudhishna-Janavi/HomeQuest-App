const Joi = require('joi');

// Define the validation schema for a property
const propertySchema = Joi.object({
  address: Joi.string().required(),
  price: Joi.number().required().min(0),
  type: Joi.string().valid('HDB', 'Condo', 'Landed', 'Other').required(),
  status: Joi.string().valid('AVAILABLE', 'RENTED').required(),
  landlords: Joi.array().optional(),
  images: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  postalCode: Joi.number().optional(),
  bedroom: Joi.number().optional(),
  bathroom: Joi.number().optional(),
  LATITUDE: Joi.number().optional(),
  LONGITUDE: Joi.number().optional()
});

// Middleware function
function validateProperty(req, res, next) {
  const { error } = propertySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // If no error, continue to the controller
}

module.exports = validateProperty;
