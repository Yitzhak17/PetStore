// cartController.js
const Cart = require('../models/cart'); // ייבוא מודל הקארט

const getCart = async (req, res) => {
  const userId = req.params.userId; // קבלת מזהה המשתמש מהפרמטרים
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // מוציא את העגלה במידע מוצרים
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart); // מחזיר את תוכן העגלה
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addToCart = async (req, res) => {
  const { userId, items } = req.body; // קבלת הנתונים מבקשת ה-POST

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ message: "User ID and items are required." });
  }

  try {
    // מחפש את עגלת הקניות הקיימת עבור המשתמש
    let cart = await Cart.findOne({ userId });

    // אם אין עגלת קניות עבור המשתמש, צור אחת חדשה
    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
      // עדכון העגלה אם היא קיימת
      items.forEach(item => {
        const existingItem = cart.items.find(i => i.productId.toString() === item.productId);
        if (existingItem) {
          existingItem.quantity += item.quantity; // אם המוצר קיים, עדכן את הכמות
        } else {
          cart.items.push(item); // אם לא קיים, הוסף מוצר חדש
        }
      });
    }

    // שמירת העגלה במסד הנתונים
    await cart.save();

    return res.status(200).json({ message: "Product added to cart successfully." });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// מחיקת פריט
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body; // קרבת על מזהה המשתמש והפריט
  try {
    const cart = await Cart.findOne({ userId }); // מוציא את העגלה עם המשתמש 

    if (cart) {
      // פילטר לפסול פריט
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save(); // שומר את השינויים בעגלה
      res.status(200).json({ message: 'Product removed from cart', cart });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};