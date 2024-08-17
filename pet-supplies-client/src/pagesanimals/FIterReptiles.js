import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // ייבוא של רשימת מוצרים
import '../css/Filter.css'; // ייבוא CSS אם יש צורך

const FilterReptiles = ({ currentUserId, onAddToCart }) => {
  const [reptileProducts, setReptileProducts] = useState([]); // שונה מ-dogProducts ל-reptileProducts
  const [loading, setLoading] = useState(true); // מצב שמעיד על כך שהנתונים נטענים

  useEffect(() => {
    const fetchReptileProducts = async () => { // עדכון שם הפונקציה
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // קבלת כל המוצרים
        const filteredReptileProducts = response.data.filter(product => product.animalCategory === 'reptile'); // סינון המוצרים עבור זוחלים
        setReptileProducts(filteredReptileProducts);
      } catch (error) {
        console.error('Error fetching reptile products:', error);
      } finally {
        setLoading(false); // מעדכן שהנתונים לא נטענים יותר
      }
    };

    fetchReptileProducts();
  }, []);
  const handleAddUserId = () => {
    alert(`Current User ID: ${currentUserId}`); // או שתוכל לשמור את מזהה המשתמש במערכת/עגלת קניות
    // פתרון נוסף: ניתן להוסיף פונקציה שתעדכן את המידע במערכת, אם יש לך צורך ככה
  };

  if (loading) {
    return <p>Loading reptile products...</p>; // הודעה בטווח של טעינה
  }

  return (
    <div className="animal-products">
      <h2>מוצרים לזוחלים</h2> {/* עדכון הכותרת */}

      {reptileProducts.length > 0 ? (
        <ProductList
          products={reptileProducts} // העברת המוצרים המסוננים לרשימת המוצרים 
          onAddToCart={onAddToCart} // העברת פונקציית הוספה לעגלה
          currentUserId={currentUserId} // העברת מזהה המשתמש
        />
      ) : (
        <p>No reptile products available</p> // עדכון ההודעה
      )}
    </div>
  );
};

export default FilterReptiles;
