import React from 'react'

import './Order.scss'

const Order = props => {

    let products = props.products.map(product => (
        <li className="OrdersProductsItem" key={product.id}>
            {product.orderItem.titleSnapshot}({product.orderItem.quantity})
            {product.orderItem.descriptionSnapshot}
        </li>
    ))

    return (
        <ul className="OrdersItem">
            <h1>Order - # {props.orderId}</h1>
            <ul className="OrdersProducts">
                {products}
            </ul>
        </ul>
    );
};

export default Order;
