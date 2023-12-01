const mongoose = require('mongoose');
const {Schema, models} = require('mongoose');

const materialSchema = new Schema({
  codigo: String,
  nombre: String,
  precioGramo: Number,
});

const Material = models.Material || mongoose.model('Material', materialSchema);

module.exports = Material;
