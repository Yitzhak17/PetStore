import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../css/Products.css';

const Products = ({ searchQuery, onAddToCart, currentUserId }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [currentPriceRange, setCurrentPriceRange] = useState([0, 100]);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 100,
        selectedCategories: [],
        selectedBrands: [],
        searchQuery: '',
    });

    const fetchProducts = async (appliedFilters) => {
        try {
            console.log('Fetching products with filters:', appliedFilters);
            const response = await axios.get('http://localhost:5000/api/products/search', {
                params: {
                    minPrice: appliedFilters.minPrice,
                    maxPrice: appliedFilters.maxPrice,
                    categories: appliedFilters.selectedCategories.join(','),
                    brands: appliedFilters.selectedBrands.join(','),
                    searchQuery: appliedFilters.searchQuery || '',
                },
            });
            console.log('Fetched products:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        console.log('Search query changed:', searchQuery);
        setFilters((prevFilters) => ({
            ...prevFilters,
            searchQuery: searchQuery || '',
        }));
    }, [searchQuery]);

    useEffect(() => {
        console.log('Filters changed:', filters);
        fetchProducts(filters);
    }, [filters]);

    useEffect(() => {
        const fetchInitialProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);

                const prices = response.data.map(product => product.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                setPriceRange([minPrice, maxPrice]);
                setCurrentPriceRange([minPrice, maxPrice]);
                setFilters({ ...filters, minPrice, maxPrice });

                const uniqueCategories = [...new Set(response.data.map(product => product.category))];
                setCategories(uniqueCategories);

                const uniqueBrands = [...new Set(response.data.map(product => product.brand))];
                setBrands(uniqueBrands);
            } catch (error) {
                console.error('Error fetching initial products:', error);
            }
        };

        fetchInitialProducts();
    }, []);

    const handleSliderChange = (value) => {
        setCurrentPriceRange(value);
    };

    const handleSliderAfterChange = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            minPrice: value[0],
            maxPrice: value[1],
        }));
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = filters.selectedCategories.includes(category)
            ? filters.selectedCategories.filter(c => c !== category)
            : [...filters.selectedCategories, category];
        setFilters((prevFilters) => ({
            ...prevFilters,
            selectedCategories: updatedCategories,
        }));
    };

    const handleBrandChange = (brand) => {
        const updatedBrands = filters.selectedBrands.includes(brand)
            ? filters.selectedBrands.filter(b => b !== brand)
            : [...filters.selectedBrands, brand];
        setFilters((prevFilters) => ({
            ...prevFilters,
            selectedBrands: updatedBrands,
        }));
    };

    return (
        <div className="products-page">
            <div className="products-list">
                <ProductList products={products} onAddToCart={onAddToCart} currentUserId={currentUserId} />
            </div>
            <div className="filters">
                <div className="price-range">
                    <Slider
                        range
                        min={priceRange[0]}
                        max={priceRange[1]}
                        value={currentPriceRange}
                        onChange={handleSliderChange}
                        onAfterChange={handleSliderAfterChange}
                    />
                    <div className="price-labels">
                        <span>{currentPriceRange[0]}</span>
                        <span>{currentPriceRange[1]}</span>
                    </div>
                </div>
                <div className="categories">
                    <h4>Categories</h4>
                    {categories.map(category => (
                        <label key={category}>
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
                <div className="brands">
                    <h4>Brands</h4>
                    {brands.map(brand => (
                        <label key={brand}>
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
    );
};


export default Products;
