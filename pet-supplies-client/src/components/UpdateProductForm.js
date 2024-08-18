import React, { useEffect, useState } from 'react'
import '../css/AddProductsForm.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProductForm = () => {
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
  const { id } = useParams() // קבלת מזהה המוצר מקובץ הנתיב

  // Fetch product details for the initial load
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/product/${id}`
        )
        setFormData(response.data) // ממלא את המידע עם פרטי המוצר
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    fetchProductDetails()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const confirmUpdate = window.confirm('Do you want to update this product?')
    if (!confirmUpdate) {
      setMessage("Product's update canceled.")
      return
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/product/${id}`,
        formData
      ) // שינוי ל- PUT
      if (response.status === 200) {
        setMessage('Product updated successfully!')
        console.log('Product updated successfully:', response.data)
        navigate('/manageproducts') // ניווט לדף הבית או לדף אחר לאחר העדכון
      } else {
        setMessage('Failed to update product.')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      setMessage('Error updating product.')
    }
  }

  return (
    <div className="add-product-form">
      <h2>עדכון פריט</h2>
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
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">עדכן פריט</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default UpdateProductForm
