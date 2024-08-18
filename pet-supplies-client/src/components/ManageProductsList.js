import React from 'react'
import '../css/ManageProductsList.css' // ייבוא CSS עבור הקומפוננטה
import { useNavigate } from 'react-router-dom' // רק useNavigate
import axios from 'axios'
const ManageProductsList = ({ products }) => {
  const navigate = useNavigate()

  const handleEditProduct = (productId) => {
    navigate(`/products/updateproduct/${productId}`) // ניווט עם מזהה המוצר
  }

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )
    if (!confirmDelete) return

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/product/${productId}`
      ) // בקשת מחיקה
      if (response.status === 200) {
        alert('Product deleted successfully!') // הודעה על הצלחה
        // מתקיימת עמודת הנתונים או מערך ההתעדכנים
        // ניתן להעלות אירוע שמחדד את הנתונים מחדש
        // handleUpdateProduct(); // כאן ניתן להוסיף קריאה כאן או ליישם אצל ההורים
        navigate('/')
      } else {
        alert('Failed to delete product.')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product.')
    }
  }

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <div className="button-container">
                <button
                  className="edit-button"
                  onClick={() => handleEditProduct(product._id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}

export default ManageProductsList
