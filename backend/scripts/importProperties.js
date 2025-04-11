const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const Property = require('../src/models/propertyModel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  importData();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

const importData = async () => {
  try {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../HomeQuest.housingdb.json'), 'utf-8')
    );
    console.log('✅ Data read:', data.length);

    await Property.insertMany(data);
    console.log('✅ Property data imported successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
};
