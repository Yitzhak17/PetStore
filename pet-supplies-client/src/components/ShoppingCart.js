import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ShoppingCart.css'; // ייבוא CSS

const ShoppingCart = ({ cartItems, setCartItems, currentUserId, setCartCount }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/users/cart/${currentUserId}`);
      setCartItems(response.data);

      const totalCount = response.data.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalCount);

      const totalCost = response.data.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
      setTotalValue(totalCost);

      setTotalQuantity(totalCount);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchCartItems();
    }
  }, [currentUserId]);

  const handleIncrement = (item) => {
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.productId._id === item.productId._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
    setCartCount(prevCount => prevCount + 1);
    calculateTotals(updatedCartItems);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedCartItems = cartItems.map(cartItem =>
        cartItem.productId._id === item.productId._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
      setCartCount(prevCount => prevCount - 1);
      calculateTotals(updatedCartItems);
    } else {
      alert("לא ניתן להפחית פחות מאחד");
    }
  };

  const calculateTotals = (items) => {
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = items.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
    setTotalQuantity(totalCount);
    setTotalValue(totalCost);
  };

  const handleRemoveItem = async (item) => {
    try {
      // מחיקת המוצר מהשרת
      await axios.delete(`http://localhost:5000/api/users/user/${currentUserId}/product/${item.productId._id}`);
      const updatedCartItems = cartItems.filter(cartItem => cartItem.productId._id !== item.productId._id);
      setCartItems(updatedCartItems);
      calculateTotals(updatedCartItems);
      const totalCount = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalCount);
      alert("המוצר נמחק מהעגלה בהצלחה");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("שגיאה במחיקת המוצר מהעגלה");
    }
  };

  // פונקציה לעדכון עגלת הקניות בשרת
  const handleUpdateCart = async () => {
    try {
      const updatedCart = cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      await axios.put(`http://localhost:5000/api/users/cart/${currentUserId}`, updatedCart);
      alert("העגלה עודכנה בהצלחה");
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("שגיאה בעדכון העגלה");
    }
  };

  if (loading) return <p>טוען...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="shopping-cart">
      <h2>עגלה שלך</h2>
      <div className="total-info">
        <button className="btn-update" onClick={handleUpdateCart}>עדכן עגלת קניות</button> {/* כפתור לעדכון עגלת הקניות */}
        <h3 className="cart-title">פרטי העגלה</h3>
        <p>סה"כ פריטים: {cartItems.length}</p>
        <p>סה"כ כמות: {totalQuantity} פריטים</p>
        <p>סה"כ עלות: ${totalValue.toFixed(2)}</p>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item.productId._id} className="cart-item">
            <img src={item.productId.imageUrl} alt={item.productId.name} />
            <div className="cart-item-details">
              <h3>{item.productId.name}</h3>
              <p>מחיר: ${item.productId.price}</p>
              <p>כמות: {item.quantity}</p>
              <button className='btn-increase' onClick={() => handleIncrement(item)}>+</button>
              <button className='btn-decrease' onClick={() => handleDecrement(item)}>-</button>
              <button className='btn-remove' onClick={() => handleRemoveItem(item)}>מחק</button>
            </div>
          </div>
        ))
      ) : (
        <p>אין פריטים בעגלה.</p>
      )}

    </div>
  );
};

export default ShoppingCart;

