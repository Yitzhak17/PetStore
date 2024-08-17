import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // ייבוא של רשימת מוצרים
import '../css/Filter.css'; // ייבוא CSS אם יש צורך

const FilterCats = ({ currentUserId, onAddToCart }) => {
  const [catProducts, setCatProducts] = useState([]); // עדכון שם המצב
  const [loading, setLoading] = useState(true); // מצב שמעיד על כך שהנתונים נטענים

  useEffect(() => {
    const fetchCatProducts = async () => { // עדכון שם הפונקציה
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // קבלת כל המוצרים
        const filteredCatProducts = response.data.filter(product => product.animalCategory === 'cat'); // סינון המוצרים עבור חתולים
        setCatProducts(filteredCatProducts);
      } catch (error) {
        console.error('Error fetching cat products:', error);
      } finally {
        setLoading(false); // מעדכן שהנתונים לא נטענים יותר
      }
    };

    fetchCatProducts();
  }, []);

  const handleAddUserId = () => {
    alert(`Current User ID: ${currentUserId}`); // או שתוכל לשמור את מזהה המשתמש במערכת/עגלת קניות
    // פתרון נוסף: ניתן להוסיף פונקציה שתעדכן את המידע במערכת, אם יש לך צורך ככה
  };
  if (loading) {
    return <p>Loading cat products...</p>; // הודעה בטווח של טעינה
  }



  return (
    <div className="animal-products">
      <h2>מוצרים לחתולים</h2> {/* עדכון הכותרת */}
      {catProducts.length > 0 ? (
        <ProductList
          products={catProducts} // העברת המוצרים המסוננים לרשימת המוצרים 
          onAddToCart={onAddToCart} // העברת פונקציית הוספה לעגלה
          currentUserId={currentUserId} // העברת מזהה המשתמש
        />
      ) : (
        <p>No cat products available</p>
      )}
    </div>
  );
};

export default FilterCats;
