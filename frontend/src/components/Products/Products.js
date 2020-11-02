import React from 'react'

import Product from './Product/Product'
import './Products.scss'

const Products = props => {
    if (!props.products) {
        return (
            <div className="ProductList">
                <h2>No products!</h2>
            </div>
        );
    }

    return (
        <ul className="ProductList">
            {props.products.map(product => (
                <Product
                    key={product.id}
                    id={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    stock={product.stock}
                    creatorId={product.userId}
                    isAuth={props.isAuth}
                    isAdmin={props.isAdmin}
                    cartAddProduct={() => props.cartAddProduct(props.token, product.id)}
                    deleteProduct={() => props.deleteProduct(props.token, product.id)}
                />
            ))}
        </ul>
    );
};

export default Products;
