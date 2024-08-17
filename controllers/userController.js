const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // ודא שהנתיב מתאים למיקום הקובץ של המודל שלך
const jwt = require('jsonwebtoken');
const Product = require('../models/product')
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7d' } // מחזיק למשך 7 ימים, ניתן לשנות לפי הגדרות האבטחה שלך
    );
};


// חשב שאתה כבר מחובר למסד הנתונים שלך בצורה כלשהי בקוד אחר

const createDefaultUsers = async (req, res) => {
    try {
        // Hash passwords
        const hashedAdminPassword = await bcrypt.hash('secureAdminPass', 10);
        const hashedUserPassword = await bcrypt.hash('secureUserPass', 10);

        const admin = new User({
            username: 'adminUser',
            password: hashedAdminPassword,
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin'
        });

        const user = new User({
            username: 'regularUser',
            password: hashedUserPassword,
            email: 'user@example.com',
            firstName: 'Regular',
            lastName: 'User',
            role: 'user'
        });

        await admin.save();
        await user.save();

        console.log('Default users created successfully');
        res.status(201).json({ message: 'Default users created successfully' });

    } catch (error) {
        console.error('Error creating default users:', error);
        res.status(500).json({ message: 'Error creating default users', error });
    }
};
const registerUser = async (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;

    // Validate input
    if (!username || !password || !email || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Optionally, you can add more input validation here (email format, password strength, etc.)

    // Check if user or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        role: "user"
    });

    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        // If user does not exist
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords do not match
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token (optional if you want tokens)
        const token = generateToken(user);

        // Return success message, token, username, role and userId
        res.json({
            message: 'Login successful',
            token, // אם אתה מתכוון להשתמש בטוקן זה
            username: user.username,
            role: user.role,
            id: user._id // הוסף את ה-ID של המשתמש
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // מחפש את כל המשתמשים
        res.status(200).json(users); // מחזיר את הרשימה ללקוח
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error during fetching users' });
    }
};

const logoutUser = (req, res) => {
    // אם אתה משתמש בעוגיה שנשמרה בטוח, תוכל לנקות את העוגיה
    res.clearCookie('token'); // מחקת את הטוקן מהעוגיות
    res.status(200).json({ message: 'Logout successful' }); // החזרת הודעה שהlogout הצליח
};

const getUser = async (req, res) => {
    const { id } = req.params; // קבלת ה-ID מהפרמטרים של הבקשה

    try {
        // חיפוש המשתמש לפי ה-ID
        const user = await User.findById(id).select('-password'); // ודא שהסיסמה לא מחוזרת

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data
        res.status(200).json(user); // מחזיר את ממצאי המשתמש בחזרה ללקוח
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addToCart = async (req, res) => {
    const { userId, items } = req.body;

    // בדוק אם הנתונים הנדרשים קיימים
    if (!userId || !items || items.length === 0) {
        return res.status(400).json({ message: "User ID and items are required." });
    }

    try {
        // חפש את המשתמש לפי ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        console.log("Current cart items:", user.cart); // מצב עגלת הקניות הנוכחית

        for (const item of items) {
            const { productId, quantity } = item;

            // חפש את המוצר לפי ID
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found.` });
            }

            // מצא אם המוצר קיים בעגלה
            const existingItem = user.cart.find(i => i.productId.toString() === productId);
            if (existingItem) {
                // אם המוצר קיים, עדכן את הכמות
                existingItem.quantity += quantity;
            } else {
                // הוסף מוצר חדש עם כל המידע הנדרש
                const cartItem = {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    quantity: quantity
                };
                user.cart.push(cartItem); // הוסף את המוצר לעגלה
                console.log("Adding item:", cartItem); // הדפסת פרטי המוצר שמתווסף
            }
        }

        // שמור את השינויים במודל המשתמש
        await user.save();
        return res.status(200).json({ message: "Products added to cart successfully.", cart: user.cart }); // מחזיר את העגלה עם פריטים אחרי ההוספה
    } catch (error) {
        console.error("Error while adding products to cart:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


const getCartItems = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('cart.productId'); // חפש את המשתמש עם המידע על המוצר
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(user.cart); // החזר את פריטי העגלה עם המידע המלא על המוצרים
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};



const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params; // קיבל את userId ו-productId מה-params

    try {
        // חפש את המשתמש לפי ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // הסר את המוצר מעגלת הקניות
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);

        // שמור את השינויים במודל המשתמש
        await user.save();

        return res.status(200).json({ message: "Product removed from cart successfully." });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const updateCart = async (req, res) => {
    const { userId } = req.params; // קבלת ID של המשתמש
    const updatedCartItems = req.body; // הנתונים המתקבלים מהלקוח (העגלה המעודכנת)

    try {
        const user = await User.findById(userId); // חיפוש המשתמש
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // עדכון עגלת הקניות של המשתמש
        user.cart = updatedCartItems; // מכתיב מחדש את העגלה עם המידע המתקבל

        await user.save(); // שמירה של השינויים

        return res.status(200).json({
            message: "Cart updated successfully.",
            cart: user.cart // החזרת העגלה החדשה
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


module.exports = {
    registerUser,
    loginUser,
    createDefaultUsers,
    getAllUsers,
    logoutUser,
    getUser,
    addToCart,
    getCartItems,
    removeFromCart,
    updateCart
};

