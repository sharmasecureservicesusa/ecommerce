import React from 'react'

import './Order.scss'

const Order = props => {

    let products = props.products.map(product => (
        <li className="OrdersProductsItem" key={product.id}>{product.title}({product.orderItem.quantity})</li>
    ))

    return (
        <li className="OrdersItem">
            <h1>Order - # {props.id}</h1>
            <ul className="OrdersProducts">
                {products}
            </ul>
        </li>
    );
};

export default Order;
