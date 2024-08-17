import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // ייבוא של רשימת מוצרים
import '../css/Filter.css'; // ייבוא CSS אם יש צורך

const FilterFish = ({ currentUserId, onAddToCart }) => {
  const [fishProducts, setFishProducts] = useState([]); // עדכון השם
  const [loading, setLoading] = useState(true); // מצב שמעיד על כך שהנתונים נטענים

  useEffect(() => {
    const fetchFishProducts = async () => { // עדכון הפונקציה
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // קבלת כל המוצרים
        const filteredFishProducts = response.data.filter(product => product.animalCategory === 'fish'); // סינון המוצרים עבור דגים
        setFishProducts(filteredFishProducts);
      } catch (error) {
        console.error('Error fetching fish products:', error);
      } finally {
        setLoading(false); // מעדכן שהנתונים לא נטענים יותר
      }
    };

    fetchFishProducts();
  }, []);
  const handleAddUserId = () => {
    alert(`Current User ID: ${currentUserId}`); // או שתוכל לשמור את מזהה המשתמש במערכת/עגלת קניות
    // פתרון נוסף: ניתן להוסיף פונקציה שתעדכן את המידע במערכת, אם יש לך צורך ככה
  };

  if (loading) {
    return <p>Loading fish products...</p>; // הודעה בטווח של טעינה
  }

  return (
    <div className="animal-products">
      <h2>מוצרים לדגים</h2> {/* עדכון הכותרת */}

      {fishProducts.length > 0 ? ( // עדכון השם
        <ProductList
          products={fishProducts} // העברת המוצרים המסוננים לרשימת המוצרים 
          onAddToCart={onAddToCart} // העברת פונקציית הוספה לעגלה
          currentUserId={currentUserId} // העברת מזהה המשתמש
        />
      ) : (
        <p>No fish products available</p> // עדכון ההודעה
      )}
    </div>
  );
};

export default FilterFish;
