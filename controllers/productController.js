const express = require('express');
const bcrypt = require('bcrypt');
const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
    const { animalCategory, productCategory, name, description, price, brand, stock, imageUrl } = req.body;

    // וודא שכל השדות מוחלקים לחלוטין מתוך שכבת קלט
    if (!animalCategory || !productCategory || !name || !description || !price || !brand || !stock) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // בדוק אם המוצר כבר קיים
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "A product already exists." });
    }

    // צור מסמך מוצר חדש
    const newProduct = new Product({
      animalCategory,
      productCategory,
      name,
      description,
      price,
      brand,
      stock,
      imageUrl,
    });

    await newProduct.save();

    return res.status(201).json({ added: true, message: "A product was added successfully!" });
  } catch (err) {
    // הצגת שגיאה בשרת
    console.error("There was an error in adding the product.", err);
    res.status(500).json({ message: "There was an error in adding the product." });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const { searchQuery, minPrice, maxPrice } = req.query; // קבלת שאילתות מהבקשה

    let filter = {}; // פעילות מבוססת על שימוש במאגר

    if (searchQuery) {
      filter.name = { $regex: new RegExp(searchQuery, 'i') }; // חיפוש של המילה
    }

    if (minPrice) {
      filter.price = { $gte: Number(minPrice) }; // חיפוש לפי מחירים נמוכים
    }

    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) }; // חיפוש לפי מחירים גבוהים
    }

    const products = await Product.find(filter); // חיפוש המוצרים עם הפילטרים
    res.status(200).json(products); // מחזיר את המוצרים

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error during fetching products' });
  }
};

// Get product by ID
exports.getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Update product
exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Delete product
exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Search products

exports.searchProducts = async (req, res) => {
  const { minPrice, maxPrice, categories, brands, searchQuery } = req.query;
  const filter = {};

  // Handle price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice); // אם יש מחיר מינימלי
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice); // אם יש מחיר מקסימלי
    }
  }

  // Handle categories
  if (categories) {
    filter.category = { $in: categories.split(',').map(c => c.trim()) }; // סנן את הקטגוריות שהתקבלו
  }

  // Handle brands
  if (brands) {
    filter.brand = { $in: brands.split(',').map(b => b.trim()) }; // סנן את המותגים שהתקבלו
  }

  // Handle search query
  if (searchQuery) {
    filter.name = { $regex: new RegExp(searchQuery, 'i') }; // חיפוש לא רגיש לרישיות
  }

  try {
    const products = await Product.find(filter); // מצא את המוצרים על פי הפילטרים
    res.json(products); // החזרת הרשימה כ-JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // החזרת שגיאה אם יש
  }
};


// Get products by subcategory
exports.getProductsBySubcategory = async (req, res) => {
  try {
    const subcategory = req.params.subcategory;
    const products = await Product.find({ subcategory: subcategory });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

