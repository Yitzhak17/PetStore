import React, { useState } from 'react';
import '../css/ProductList.css';
import axios from 'axios';

const ProductList = ({ products, onAddToCart, currentUserId }) => { // הוספת userId
  const [counts, setCounts] = useState({}); // ניהול הכמויות

  // פונקציה להגדלת הכמות של מוצר
  const handleIncrement = (productId) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1 // הגדלת הכמות לפי מזהה מוצר
    }));
  };

  // פונקציה להקטנת הכמות של מוצר
  const handleDecrement = (productId) => {
    setCounts(prevCounts => {
      const currentCount = prevCounts[productId] || 0;
      if (currentCount > 0) {
        return {
          ...prevCounts,
          [productId]: currentCount - 1 // הפחתת כמות
        };
      }
      return prevCounts; // אם הכמות היא 0, לא נחקור שינויים
    });
  };

  const handleAddToCart = async (product) => {
    const count = counts[product._id] || 0; // קבלת הכמות הנוכחית
    console.log('Adding product to cart:', { userId: currentUserId, productId: product._id, quantity: count }); // לוג למידע הנשלח
    if (count > 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/addproduct', {
          userId: currentUserId,
          items: [
            {
              productId: product._id, // מזהה מוצר
              quantity: count // הכמות שנבחרה
            },
          ],
        });
        console.log("Product added to cart response:", response.data);
        onAddToCart(product, count); // עדכון העגלה
        setCounts(prevCounts => ({ ...prevCounts, [product._id]: 0 })); // אפס את הכמות
      } catch (error) {
        console.error("Error adding product to cart:", error.response.data); // הדפסת תשובת השגיאה
        alert("Failed to add product to cart: " + error.response.data.message);
      }
    } else {
      alert("כמות חייבת להיות גבוהה מ-0", currentUserId);
    }
  };
  return (
    <div className="product-grid">

      {products.length > 0 ? (
        products.map((product) => {
          const count = counts[product._id] || 0; // קבלת הכמות בעגלה

          return (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">מחיר: ${product.price}</p>
                <div className="button-container">
                  <button className='add-button' onClick={() => handleIncrement(product._id)}>+</button>
                  <p>{count}</p>
                  <button className='subtract-button' onClick={() => handleDecrement(product._id)}>-</button>
                </div>
                <button
                  className='button-add'
                  onClick={() => handleAddToCart(product)} // הקריאה להוספה לעגלה
                >
                  הוסף לעגלה
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
