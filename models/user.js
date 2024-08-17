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

// סכימת משתמש
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // שם משתמש ייחודי
    password: { type: String, required: true }, // סיסמת המשתמש
    email: { type: String, required: true, unique: true }, // אימייל ייחודי
    firstName: { type: String, required: true }, // שם פרטי
    lastName: { type: String, required: true }, // שם משפחה
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // תפקיד
    cart: [cartItemSchema] // כאן הוספנו את המערך של פריטי העגלה ישירות במודל המשתמש
}, { timestamps: true }); // שמירת חותמות זמן ליצירה ועדכון

const User = mongoose.model('User', userSchema);

module.exports = User;



/*
// סכימת המידע שנדרש עבור משתמש
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // שם משתמש ייחודי
    password: { type: String, required: true }, // סיסמת המשתמש
    email: { type: String, required: true, unique: true }, // אימייל ייחודי
    firstName: { type: String, required: true }, // שם פרטי
    lastName: { type: String, required: true }, // שם משפחה
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // תפקיד
    cart: [{ // מערך עבור העגלה
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // קישור למודל המוצר
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // ברירת מחדל היא 1
        }
    }],
}, { timestamps: true }); // חותמות זמן ליצירה ועדכון

const User = mongoose.model('User', userSchema);

module.exports = User;

*/

/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }  // הוסף שדה תפקיד עם ערך ברירת מחדל של 'user'
});

module.exports = mongoose.model('User', userSchema);

*/

/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

*/