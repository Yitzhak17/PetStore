const mongoose = require('mongoose');

// סכימת פריט בעגלת הקניות
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // קישור למודל המוצר
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // ברירת מחדל היא 1
  },
});

// סכימת עגלת הקניות עצמה
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // קישור למודל המשתמש
    required: true,
  },
  items: [cartItemSchema], // מערך של פריטי העגלת קניות
}, { timestamps: true }); // שמירת חותמות זמן יצירה ועדכון

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;


/*const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { // מישהו שמזמין עומק עד שהיי מתנתק
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { // כמות של מוצר
    type: Number,
    required: true,
    default: 1,
  },
  price: { // מחיר יכול לשפר חישובי סך קניות
    type: Number,
    required: true,
  },
}, { timestamps: true }); // אם תרצה לפי תאריך היצירה או העדכון

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

*/


/*const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
*/