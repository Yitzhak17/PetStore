const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  animalCategory: { type: String, required: true }, // סוג החיה (למשל: 'dog', 'cat')
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, // תאריך יצירה
  imageUrl: { type: String, required: true },
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
