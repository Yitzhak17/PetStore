
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import SubcategoryProducts from './pages/SubcategoryProducts';
import Dashboard from './components/Dashboard';
import './App.css';
import Logout from './components/Logout';
import axios from 'axios';
import AddProducts from './pages/AddProductsForm';
import ManageProducts from './pages/ManageProducts';
import FilterDogs from './pagesanimals/FilterDogs';
import FilterCats from './pagesanimals/FilterCats';
import FilterBirds from './pagesanimals/FilterBirds';
import FilterFish from './pagesanimals/FilterFish';
import FilterRotends from './pagesanimals/FilterRotends';
import FilterReptiles from './pagesanimals/FIterReptiles';
import UpdateProductForm from './components/UpdateProductForm';
import ShoppingCart from './components/ShoppingCart';
//import jwtDecode from 'jwt-decode';



function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [username, setUsername] = useState(''); // הוספת מצב ל-username
    const [role, setRole] = useState(''); // הוסף מצב לתפקיד
    const [currentUserId, setCurrentUserId] = useState(''); // הוסף מצב למזהה המשתמש
    const [cartItems, setCartItems] = useState([]); // הגדרת cartItems כדי לנהל את עגלת הקניות

    //   const [role, setRole] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log('Search query:', query);
    };

    const addToCart = (product, quantity) => {
        // בודק שאיכות הכמות היא גבוהה מ-0
        if (quantity <= 0) {
            alert("כמות חייבת להיות גבוהה מ-0");
            return;
        }

        // עדכון מצב פרטי העגלה (cartItems)
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);

            if (existingItem) {
                // אם המוצר קיים, עדכן את הכמות
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: existingItem.quantity + quantity }
                        : item
                );
            }
            // אם המוצר לא קיים, הוסף מוצר חדש עם הכמות
            return [...prevItems, { ...product, quantity }];
        });
    };
    return (
        <Router>
            <div className="App">
                <Header onSearch={handleSearch} username={username} role={role} />
                <br />
                <Navbar cartCount={cartCount} />
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products searchQuery={searchQuery} onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/login" element={<Login setUsername={setUsername} setRole={setRole} setCurrentUserId={setCurrentUserId} />} />
                    <Route path="/logout" element={<Logout setUsername={setUsername} setRole={setRole} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/category" element={<SubcategoryProducts />} />
                    <Route path="/manageproducts/addproducts" element={<AddProducts />} />
                    <Route path="/manageproducts" element={<ManageProducts />} />
                    <Route path="/products/dogproducts" element={<FilterDogs onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/products/catproducts" element={<FilterCats onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/products/birdproducts" element={<FilterBirds onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/products/fishproducts" element={<FilterFish onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/products/repitleproducts" element={<FilterReptiles onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/products/rodentproducts" element={<FilterRotends onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/products/updateproduct/:id" element={<UpdateProductForm onAddToCart={addToCart} currentUserId={currentUserId} />} />
                    <Route path="/cart" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} currentUserId={currentUserId} setCartCount={setCartCount} // מענה עם פרופס
                    />} />


                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

