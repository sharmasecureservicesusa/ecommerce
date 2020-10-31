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
            {props.cartItems.map(cartItem => (
                <CartItem
                    key={cartItem.id}
                    id={cartItem.id}
                    imageUrl={cartItem.imageUrl}
                    title={cartItem.title}
                    price={cartItem.price}
                    description={cartItem.description}
                    deleteCartItem={() => props.deleteCartItem(props.token, cartItem.id)}
                />
            ))}
        </ul>
    );
};

export default CartItems;
