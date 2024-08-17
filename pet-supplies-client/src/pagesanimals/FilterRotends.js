import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // ייבוא של רשימת מוצרים
import '../css/Filter.css'; // ייבוא CSS אם יש צורך

const FilterRotends = ({ currentUserId, onAddToCart }) => {
  const [rotendProducts, setRotendProducts] = useState([]); // עדכון השם
  const [loading, setLoading] = useState(true); // מצב שמעיד על כך שהנתונים נטענים

  useEffect(() => {
    const fetchRotendProducts = async () => { // עדכון שם הפונקציה
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // קבלת כל המוצרים
        const filteredRotendProducts = response.data.filter(product => product.animalCategory === 'rotend'); // סינון המוצרים עבור רוטנדים
        setRotendProducts(filteredRotendProducts);
      } catch (error) {
        console.error('Error fetching rotend products:', error);
      } finally {
        setLoading(false); // מעדכן שהנתונים לא נטענים יותר
      }
    };

    fetchRotendProducts();
  }, []);
  const handleAddUserId = () => {
    alert(`Current User ID: ${currentUserId}`); // או שתוכל לשמור את מזהה המשתמש במערכת/עגלת קניות
    // פתרון נוסף: ניתן להוסיף פונקציה שתעדכן את המידע במערכת, אם יש לך צורך ככה
  };

  if (loading) {
    return <p>Loading rotend products...</p>; // הודעה בטווח של טעינה
  }

  return (
    <div className="animal-products">
      <h2>מוצרים למכרסמים</h2> {/* עדכון הכותרת */}

      {rotendProducts.length > 0 ? ( // עדכון השם
        <ProductList
          products={rotendProducts} // העברת המוצרים המסוננים לרשימת המוצרים 
          onAddToCart={onAddToCart} // העברת פונקציית הוספה לעגלה
          currentUserId={currentUserId} // העברת מזהה המשתמש
        />
      ) : (
        <p>No rotend products available</p> // עדכון ההודעה
      )}
    </div>
  );
};

export default FilterRotends;
