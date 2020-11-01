import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import CartItems from '../../components/CartItems/CartItems'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Cart.scss'

const Cart = (props) => {

    const { onFetchCart, onPlaceOrderInit, purchased, token } = props;
    useEffect(() => {
        onPlaceOrderInit()
        onFetchCart(token)
    }, [onFetchCart, onPlaceOrderInit, purchased, token])

    const cartDeleteProductHandler = (token, productId) => {
        props.onCartDeleteProduct(token, productId)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onPlaceOrder(props.token)
    }

    let purchasedRedirect = null
    if (purchased) {
        purchasedRedirect = <Redirect to="/orders" />
    }

    let cartItems = <Spinner />
    if (!props.loading) {
        cartItems =
            <>
                <CartItems
                    cartItems={props.cartItems}
                    token={props.token}
                    cartDeleteProduct={cartDeleteProductHandler} />
                {purchasedRedirect}
                <form onSubmit={submitHandler}>
                    <Button disabled={props.cartItems.length === 0} btnType="Success">Place Order</Button>
                </form>
            </>
    }

    return (
        <>
            <h1>Cart Page</h1>
            {cartItems}
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.shop.loading,
        token: state.auth.token,
        cartItems: state.shop.cartItems,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onCartDeleteProduct: (token, productId) => dispatch(actions.cartDeleteProduct(token, productId)),
        onPlaceOrderInit: () => dispatch(actions.placeOrderInit()),
        onPlaceOrder: (token) => dispatch(actions.placeOrder(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)