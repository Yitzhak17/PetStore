import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // ייבוא של רשימת מוצרים
import '../css/Filter.css'; // ייבוא CSS אם יש צורך

const FilterDogs = ({ currentUserId, onAddToCart }) => { // הוספת props לקבלת מזהה משתמש ופונקציית הוספה לעגלה
  const [dogProducts, setDogProducts] = useState([]); // מצב לאחסון מוצרים של כלבים
  const [loading, setLoading] = useState(true); // מצב שמעיד על כך שהנתונים נטענים

  useEffect(() => {
    const fetchDogProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // קבלת כל המוצרים
        const filteredDogProducts = response.data.filter(product => product.animalCategory === 'dog'); // סינון המוצרים עבור כלבים
        setDogProducts(filteredDogProducts); // עדכון המצב עם המוצרים המסוננים
      } catch (error) {
        console.error('Error fetching dog products:', error);
      } finally {
        setLoading(false); // מעדכן שהנתונים לא נטענים יותר
      }
    };

    fetchDogProducts(); // קריאה לפונקציה לקבלת נתונים
  }, []);

  const handleAddUserId = () => {
    alert(`Current User ID: ${currentUserId}`); // או שתוכל לשמור את מזהה המשתמש במערכת/עגלת קניות
    // פתרון נוסף: ניתן להוסיף פונקציה שתעדכן את המידע במערכת, אם יש לך צורך ככה
  };

  if (loading) {
    return <p>Loading dog products...</p>; // הודעת טעינה
  }

  return (
    <div className="dog-products">
      <h2>מוצרים לכלבים</h2> {/* כותרת המסך */}
      {dogProducts.length > 0 ? (
        <ProductList
          products={dogProducts} // העברת המוצרים המסוננים לקומפוננטת רשימה
          onAddToCart={onAddToCart} // העברת פונקציית הוספה לעגלה
          currentUserId={currentUserId} // העברת מזהה המשתמש
        />
      ) : (
        <p>אין מוצרים לכלבים זמינים</p> // הודעה אם אין מוצרים
      )}
    </div>
  );
};

export default FilterDogs;


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // ייבוא של רשימת מוצרים
import '../css/Filter.css'; // ייבוא CSS אם יש צורך

const FilterDogs = () => {
  const [dogProducts, setDogProducts] = useState([]); // מצב לאחסון מוצרים של כלבים
  const [loading, setLoading] = useState(true); // מצב שמעיד על כך שהנתונים נטענים

  useEffect(() => {
    const fetchDogProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // קבלת כל המוצרים
        const filteredDogProducts = response.data.filter(product => product.animalCategory === 'dog'); // סינון המוצרים עבור כלבים
        setDogProducts(filteredDogProducts); // עדכון המצב עם המוצרים המסוננים
      } catch (error) {
        console.error('Error fetching dog products:', error);
      } finally {
        setLoading(false); // מעדכן שהנתונים לא נטענים יותר
      }
    };

    fetchDogProducts(); // קריאה לפונקציה לקבלת נתונים
  }, []);

  if (loading) {
    return <p>Loading dog products...</p>; // הודעת טעינה
  }

  return (
    <div className="dog-products">
      <h2>מוצרים לכלבים</h2>
{
  dogProducts.length > 0 ? (
    <ProductList
      products={dogProducts} // העברת המוצרים המסוננים לקומפוננטת רשימה
    />
  ) : (
  <p>אין מוצרים לכלבים זמינים</p> // הודעה אם אין מוצרים
)
}
    </div >
  );
};

export default FilterDogs;
*/