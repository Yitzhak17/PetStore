import React, { useState } from 'react'
import '../css/AddProductsForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    animalCategory: '',
    category: '',
    name: '',
    description: '',
    price: '',
    brand: '',
    stock: '',
    imageUrl: '',
  })

  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // להמיר את המחיר למספר
    const updatedFormData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    console.log(updatedFormData) // בדוק את הנתונים שנשלחים

    try {
      const response = await axios.post(
        'http://localhost:5000/api/products/addproduct',
        updatedFormData
      )
      if (response.status === 201) {
        setMessage('Product added successfully!')
        navigate('/')
      } else {
        setMessage('Failed to add product.')
      }
    } catch (error) {
      console.error('Error adding product:', error)
      if (error.response) {
        console.log('Server response:', error.response.data)
      }
      setMessage('Error adding product.')
    }
  }

  // Helper function to validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string) // Trying to create a URL object will throw an error if invalid
      return true
    } catch (_) {
      return false // Return false if invalid
    }
  }

  return (
    <div className="add-product-form">
      <h2>הוסף פריט חדש</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>קטגוריית החיה:</label>
          <select
            name="animalCategory"
            value={formData.animalCategory}
            onChange={handleChange}
            required
          >
            <option value="">בחר חיה</option>
            <option value="dog">כלב</option>
            <option value="cat">חתול</option>
            <option value="bird">ציפור</option>
            <option value="fish">דג נוי</option>
            <option value="reptile">זוחל</option>
            <option value="rotend">מכרסם</option>
          </select>
        </div>
        <div className="form-group">
          <label>קטגוריית המוצר:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">בחר קטגוריה</option>
            <option value="food">מזון</option>
            <option value="toy">צעצוע</option>
            <option value="accessory">אביזר</option>
          </select>
        </div>
        <div className="form-group">
          <label>שם המוצר:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>תיאור:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>מחיר:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>מותג:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>מלאי:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="הכנס כתובת קישור לתמונה"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">הוסף פריט</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default AddProductForm
