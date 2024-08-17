// src/pages/SubcategoryProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SubcategoryProducts = () => {
  const { subcategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/subcategory/${subcategory}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [subcategory]);

  return (
    <div>
      <h2>{subcategory} Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryProducts;
