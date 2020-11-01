import React from 'react'

import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'

import './CartItem.scss'

const CartItem = (props) => {
    let cartItem = (
        <Card className="CartItem">
            <h1 className="CartItemTitle">
                {props.title}
            </h1>
            <h2 className="CartItemPrice">
                quantity:{props.quantity}
            </h2>
            <h2 className="CartItemPrice">
                total$:{props.price * props.quantity}
            </h2>
            <Button to={`/products/${props.id}`} btnType="Success">Detail</Button>
            <Button clicked={props.addProduct} btnType="Success">Add</Button>
            <Button clicked={props.decProduct} btnType="Danger">Dec</Button>
        </Card>
    )
    return (
        <>
            {cartItem}
        </>
    )
}

export default CartItem