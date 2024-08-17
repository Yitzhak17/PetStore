import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../css/ManageProducts.css'; // ודא שהCSS קיים בתיקייה המתאימה
import ManageProductsList from '../components/ManageProductsList'; // ייבוא הקומפוננטה

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]); // הוספת קטגוריות חיות
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPriceRange, setCurrentPriceRange] = useState([0, 100]);
  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedBrands: [],
    selectedAnimals: [], // הוספת בחירת חיות
    minPrice: 0,
    maxPrice: 100,
  });

  const navigate = useNavigate();

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        const prices = response.data.map(product => product.price);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
        setCurrentPriceRange([Math.min(...prices), Math.max(...prices)]);

        // קביעת קטגוריות ומותגים ייחודיים
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);

        const uniqueBrands = [...new Set(response.data.map(product => product.brand))];
        setBrands(uniqueBrands);

        // הוספת קטגוריות של חיות
        const animalCats = ['dog', 'cat', 'bird', 'reptile', 'fish', 'rodent'];
        setAnimalCategories(animalCats);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const newFilteredProducts = products.filter(product => {
        const isInPriceRange = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        const isInCategory = filters.selectedCategories.length === 0 || filters.selectedCategories.includes(product.category);
        const isInBrand = filters.selectedBrands.length === 0 || filters.selectedBrands.includes(product.brand);
        const isInAnimalCategory = filters.selectedAnimals.length === 0 || filters.selectedAnimals.includes(product.animalCategory); // הוספת פילטר חיות
        return isInPriceRange && isInCategory && isInBrand && isInAnimalCategory;
      });
      setFilteredProducts(newFilteredProducts);
    };

    applyFilters();
  }, [products, filters]);


  const handleSliderChange = (value) => {
    setCurrentPriceRange(value);
  };

  const handleSliderAfterChange = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedCategories: updatedCategories,
    }));
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedBrands: updatedBrands,
    }));
  };

  const handleAnimalCategoryChange = (animal) => { // טיפול במסנני חיות
    const updatedAnimals = filters.selectedAnimals.includes(animal)
      ? filters.selectedAnimals.filter(a => a !== animal)
      : [...filters.selectedAnimals, animal];
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedAnimals: updatedAnimals,
    }));
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      <button className="add-product-button" onClick={() => navigate('/manageproducts/addproducts')}>Add Product</button>
      <div className="products-container">
        <div className="filters-container">
          <h3>Product Filters</h3>
          <div className="filters">
            <div className="price-range">
              <h4>Price Range</h4>
              <Slider
                range
                min={priceRange[0]}
                max={priceRange[1]}
                value={currentPriceRange}
                onChange={handleSliderChange}
                onAfterChange={handleSliderAfterChange}
                railStyle={{ backgroundColor: '#ddd' }}
                handleStyle={[{ backgroundColor: '#ff4d4f' }, { backgroundColor: '#ff4d4f' }]}
                trackStyle={[{ backgroundColor: '#ff4d4f' }]}
              />
              <div className="price-labels">
                <span>${currentPriceRange[0]}</span>
                <span>${currentPriceRange[1]}</span>
              </div>
            </div>
            <div className="categories">
              <h4>Categories</h4>
              {categories.map(category => (
                <label className="category-checkbox" key={category}>
                  <input
                    type="checkbox"
                    value={category}
                    checked={filters.selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
            <div className="animal-categories"> {/* פילטר חיות */}
              <h4>Animal Categories</h4>
              {animalCategories.map(animal => (
                <label className="animal-checkbox" key={animal}>
                  <input
                    type="checkbox"
                    value={animal}
                    checked={filters.selectedAnimals.includes(animal)}
                    onChange={() => handleAnimalCategoryChange(animal)}
                  />
                  {animal}
                </label>
              ))}
            </div>
            <div className="brands">
              <h4>Brands</h4>
              {brands.map(brand => (
                <label className="brand-checkbox" key={brand}>
                  <input
                    type="checkbox"
                    value={brand}
                    checked={filters.selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="product-list-container">
          <h3>Product List</h3>
          <ManageProductsList
            products={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
