const Property = require('../models/propertyModel');

// GET /properties - List all properties with pagination
exports.getAllProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const skip = (page - 1) * limit;

    const totalItems = await Property.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const properties = await Property.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      totalPages,
      totalItems,
      properties
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//newly changed! April 7

// POST /properties - Create a new property listing
exports.createProperty = async (req, res) => {
  try {
    const { address, price, type, status, landlords } = req.body;
    const newProperty = new Property({ address, price, type, status, landlords });
    await newProperty.save();
    res.status(201).json({ message: 'Property created', property: newProperty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /properties/:id - Retrieve property details by ID
exports.getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /properties/:id - Update a property listing
exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updatedData = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, updatedData, { new: true });
    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property updated', property: updatedProperty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /properties/:id - Delete a property listing
exports.deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const deletedProperty = await Property.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /properties/search - Search properties by query parameters
exports.searchProperties = async (req, res) => {
  try {
    const { price, minPrice, maxPrice, type, status, keyword } = req.query;
    const filter = {};

    if (price) filter.price = price;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    if (type) filter.type = type;
    if (status) filter.status = status;

    // ✅ Use $or only if keyword is present
    if (keyword) {
      filter.$or = [
        { address: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    const properties = await Property.find(filter);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Filter properties by price range
// @route   GET /api/properties/filter
// @access  Public
exports.filterPropertiesByPrice = async (req, res) => {
  try {
    const minPrice = parseInt(req.query.min) || 0;
    const maxPrice = parseInt(req.query.max) || Infinity;

    const properties = await Property.find({
      price: { $gte: minPrice, $lte: maxPrice }
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error filtering properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
