import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search-icon.png';
import '../css/SearchBar.css';
import axios from 'axios'; // ייבוא axios

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]); // מצב לספק הצעות
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // אם יש טקסט בשאילתא, חפש מוצרים
        if (newQuery.trim() !== '') {
            searchProducts(newQuery);
        } else {
            setSuggestions([]); // אם השדה ריק, נקה את ההצעות
        }
    };

    const searchProducts = async (searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/search`, {
                params: { query: searchTerm } // מתן טווח חיפוש
            });
            setSuggestions(response.data); // עדכון הצעות לפי תוצאות החיפוש
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };

    const handleSearchClick = () => {
        performSearch();
    };

    const performSearch = () => {
        if (query.trim() === '') {
            navigate('/products');
        } else {
            onSearch(query); // שליחת השאילתא לפונקציה העליונה
            setQuery(''); // ניקוי שדה הקלט
            setSuggestions([]); // ניקוי הצעות
            navigate('/products');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    return (
        <div className="search-bar">
            <button className="search-button" onClick={handleSearchClick}>
                <img src={searchIcon} alt="Search" />
            </button>
            <input
                type="text"
                placeholder="חפש..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="search-input"
            />
            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((product) => (
                        <div key={product._id} className="suggestion-item" onClick={() => {
                            setQuery(product.name); // אם לוחצים על הצעה, עדכן את השאילתא
                            onSearch(product.name); // מחפש את המוצר שנבחר
                            setSuggestions([]); // נקה את ההצעות
                            navigate('/products'); // ניווט לדף המוצרים
                        }}>
                            {product.name} {/* מצג שם המוצר */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search-icon.png';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchClick = () => {
        performSearch();
    };

    const performSearch = () => {
        if (query.trim() === '') {
            navigate('/products');
        } else {
            onSearch(query);
            setQuery(''); // לנקות את שדה הקלט לאחר חיפוש
            navigate('/products');
        }
    };

    // פונקציה לטיפול בלחיצת מקש Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    return (
        <div className="search-bar">
            <button className="search-button" onClick={handleSearchClick}>
                <img src={searchIcon} alt="Search" />
            </button>
            <input
                type="text"
                placeholder="חפש..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} // הוסף טיפול בלחיצות מקש
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
*/