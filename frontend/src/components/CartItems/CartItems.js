import React from 'react'

import CartItem from './CartItem/CartItem'
import './CartItems.scss'

const CartItems = props => {
    if (!props.cartItems) {
        return (
            <div className="CartItemList">
                <h2>No Cart Items!</h2>
            </div>
        );
    }

    return (
        <ul className="CartItemList">
            {props.cartItems.map(product => (
                <CartItem
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    quantity={product.cartItem.quantity}
                    price={product.price}
                    deleteCartItem={() => props.deleteCartItem(props.token, product.id)}
                />
            ))}
        </ul>
    );
};

export default CartItems;
