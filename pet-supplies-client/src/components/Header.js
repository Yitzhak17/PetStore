import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // ייבוא של רכיב החיפוש
import '../css/Header.css';

const Header = ({ onSearch, username, role }) => (
    <header className="header-nav">
        <div className="left-navbar">
            <Link to="/" className="brand">Petway</Link>
        </div>

        <div className="nav-links">
            {role === 'admin' && ( // רק אם מדובר במשתמש אדמין
                <>
                    <Link to="/manageproducts" className='link-btn'>Manage Products</Link>
                    <Link to="/dashboard" className="link-btn">Dashboard</Link>
                </>
            )}

            <Link to="/products" className="link-btn">Products</Link>
        </div>

        <SearchBar onSearch={onSearch} /> {/* הכנס את רכיב החיפוש */}

        <div className="login-button">
            {username ? (
                <>
                    <span className="username-display">{username}</span> {/* הצגת שם המשתמש */}
                    <Link to="/logout" className='link-btn'>Logout</Link> {/* קישור ל-logout */}
                </>
            ) : (
                <Link to="/login" className='link-btn'>Login</Link>
            )}
        </div>
    </header>
);

export default Header;

/*import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // הניחו שיש לכם רכיב כמו זה
import '../css/Header.css';

const Header = ({ onSearch, username, role }) => (
    <header className="header-nav">
        <div className="left-navbar">
            <Link to="/" className="brand">Petway</Link>
        </div>

        <div className="nav-links">
            {role === 'admin' && ( // רק אם מדובר במשתמש אדמין
                <>
                    <Link to="/manageproducts" className='link-btn'>Manage Products</Link>
                    <Link to="/dashboard" className="link-btn">Dashboard</Link>
                </>
            )}

            <Link to="/products" className="link-btn">Products</Link>
        </div>

        <SearchBar onSearch={onSearch} />

        <div className="login-button">
            {username ? (
                <>
                    <span className="username-display"><Link to="/logout" className='link-btn'>Logout</Link> 
                </>
            ) : (
    <Link to="/login" className='link-btn'>Login</Link>
)}
        </div >
    </header >
);

export default Header;
*/


/*import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../css/Header.css';

const Header = ({ onSearch, username, role }) => (
    <header className="header-nav">
        <div className="left-navbar">
            <Link to="/" className="brand">Petway</Link>
        </div>

        <div className="nav-links">
            {role === 'admin' && ( // רק אם המשתמש הוא אדמין
                <Link to="/manageproducts" className='link-btn'>Manage Products</Link>
            )}
            <Link to="/dashboard" className="link-btn">Dashboard</Link>
            <Link to="/products" className="link-btn">Products</Link>
        </div>

        <SearchBar onSearch={onSearch} />

        <div className="login-button">
            {username ? (
                <span className="username-display">{username}</span>
            ) : ' אורח '}
            <Link to="/login" className='link-btn'>Login</Link>
        </div>
    </header>
);

export default Header;
*/

/*import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../css/Header.css';

const Header = ({ onSearch, username }) => (
    <header className="header-nav">
        <div className="left-navbar">
            <Link to="/" className="brand">Petway</Link>
        </div>

        <div className="nav-links">
            <Link to="/manageproducts" className='link-btn'>Manage Products</Link>
            <Link to="/dashboard" className="link-btn">Dashboard</Link>
            <Link to="/products" className="link-btn">Products</Link>
        </div>

        <SearchBar onSearch={onSearch} />

        <div className="login-button">
            {username ? (
                <span className="username-display">{username}</span>
            ) : ' אורח '}
            <Link to="/login" className='link-btn'>Login</Link>
        </div>
    </header>
);

export default Header;

*/


/*import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../css/Header.css';

const Header = ({ role, onSearch }) => (
    <header className="header-nav">
        <div className="left-navbar">
            <Link to="/" className="brand">Petway</Link>
        </div>

        <div className="nav-links">
            <Link to="/manageproducts" className='link-btn'>Manage Products</Link>
            <Link to="/dashboard" className="link-btn">Dashboard</Link>
            <Link to="/products" className="link-btn">Products</Link>

        </div>
        <SearchBar onSearch={onSearch} />
        <div className="login-button">
            <Link to="/login" className='link-btn'>Login</Link>

        </div>
    </header >

);

export default Header;

*/


/*
     <SearchBar onSearch={onSearch} />
*/

/*import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../css/Header.css'

const Header = ({ onSearch }) => (
    <header className="header">
        <div className="navbar">
            <Link to="/">Petway</Link>
            <div>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
        </div>
        <SearchBar onSearch={onSearch} />
    </header>
);

export default Header;
*/

/*
                {
                    role === "" ?
                        <Link to="/login" className='link-btn'>Login</Link>
                        : <Link to="/logout" className='link-btn'>Logout</Link>
                }
 <SearchBar onSearch={onSearch} />

*/