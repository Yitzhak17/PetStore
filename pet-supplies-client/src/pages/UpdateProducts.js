import React from 'react'
import ProductList from '../components/ProductList'
const UpdateProducts = ({ products }) => {
  return (
    <div className="products-page">
      <div className="products-list">
        <ProductList products={products} />
      </div>
    </div>
  )
}

export default UpdateProducts
