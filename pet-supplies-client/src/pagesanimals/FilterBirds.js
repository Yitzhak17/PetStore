import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // ייבוא של רשימת מוצרים
import '../css/Filter.css'; // ייבוא CSS אם יש צורך

const FilterBirds = ({ currentUserId, onAddToCart }) => {
  const [birdProducts, setBirdProducts] = useState([]); // עדכון השם
  const [loading, setLoading] = useState(true); // מצב שמעיד על כך שהנתונים נטענים

  useEffect(() => {
    const fetchBirdProducts = async () => { // עדכון השם
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // קבלת כל המוצרים
        const filteredBirdProducts = response.data.filter(product => product.animalCategory === 'bird'); // סינון המוצרים עבור ציפורים
        setBirdProducts(filteredBirdProducts);
      } catch (error) {
        console.error('Error fetching bird products:', error);
      } finally {
        setLoading(false); // מעדכן שהנתונים לא נטענים יותר
      }
    };

    fetchBirdProducts();
  }, []);


  if (loading) {
    return <p>Loading bird products...</p>; // הודעה בטווח של טעינה
  }

  return (
    <div className="animal-products">
      <h2>מוצרים לציפורים</h2>

      {birdProducts.length > 0 ? ( // עדכון השם
        <ProductList
          products={birdProducts} // העברת המוצרים המסוננים לרשימת המוצרים 
          onAddToCart={onAddToCart} // העברת פונקציית הוספה לעגלה
          currentUserId={currentUserId} // העברת מזהה המשתמש
        />
      ) : (
        <p>No bird products available</p> // עדכון ההודעה
      )}
    </div>
  );
};

export default FilterBirds;
