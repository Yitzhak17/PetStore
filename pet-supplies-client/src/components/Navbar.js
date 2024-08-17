import React from 'react';
import { Link } from 'react-router-dom';
import dogIcon from '../assets/dogicon.png';
import catIcon from '../assets/caticon.png';
import birdIcon from '../assets/birdicon.png';
import fishIcon from '../assets/fishicon.png';
import reptileIcon from '../assets/reptileicon.png';
import smallPetIcon from '../assets/rodenticon.png';
import accessoriesIcon from '../assets/accessoriesicon.png';
import specialsIcon from '../assets/saleicon.png';
import cartIcon from '../assets/carticon.png';
//import subcategories from '../data/subcategories';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  //const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();


  const handleClickDogs = () => {
    navigate('/products/dogproducts'); // נווט לדף המוצרים עבור כלבים
  };

  const handleClickCats = () => {
    navigate('/products/catproducts'); // נווט לדף המוצרים עבור כלבים
  };

  const handleClickBirds = () => {
    navigate('/products/birdproducts'); // נווט לדף המוצרים עבור כלבים
  };


  const handleClickFish = () => {
    navigate('/products/fishproducts'); // נווט לדף המוצרים עבור כלבים
  };


  const handleClickReptile = () => {
    navigate('/products/repitleproducts'); // נווט לדף המוצרים עבור כלבים
  };

  const handleClickRodent = () => {
    navigate('/products/rodentproducts'); // נווט לדף המוצרים עבור כלבים
  };




  return (
    <nav className="navbar">
      <ul className="main-categories">
        <li><Link to="/">ראשי</Link></li>
        <li
          onClick={handleClickDogs} // הוספת אירוע לחיצה על ה-li
          style={{ cursor: 'pointer' }} // ציון שהיישות ניתנת ללחיצה
        >
          <div className="category-icon">
            <img src={dogIcon} alt="Dogs" />
            <span>כלבים</span>
          </div>
        </li>
        <li
          onClick={handleClickCats}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-icon">
            <img src={catIcon} alt="Cats" />
            <span>חתולים</span>
          </div>
        </li>
        <li
          onClick={handleClickBirds}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-icon">
            <img src={birdIcon} alt="Birds" />
            <span>ציפורים</span>
          </div>
        </li>
        <li
          onClick={handleClickFish}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-icon">
            <img src={fishIcon} alt="Fish" />
            <span>דגי נוי</span>
          </div>
        </li>
        <li
          onClick={handleClickReptile}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-icon">
            <img src={reptileIcon} alt="Reptiles" />
            <span>זוחלים</span>
          </div>
        </li>
        <li
          onClick={handleClickRodent}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-icon">
            <img src={smallPetIcon} alt="Rotends" />
            <span>מכרסמים</span>
          </div>

        </li>
        <li
          onClick={handleClickBirds}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-icon">
            <img src={accessoriesIcon} alt="Accessories" />
            <span>אביזרים</span>
          </div>
        </li>
        <li
          onClick={handleClickBirds}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-icon">
            <img src={specialsIcon} alt="Specials" />
            <span>מבצעים</span>
          </div>
        </li>
        <li>
          <Link to="/cart">
            <div className="cart-icon">
              <img src={cartIcon} alt="Cart" />
              <span className='cart-count'>{cartCount}</span>
            </div>
            סל הקניות שלי
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
