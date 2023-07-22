const mongoose = require('mongoose');

// Define Schemes
const personSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  count: { type: Number, required: true },
  name: { type: String, required: true }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Person', personSchema);