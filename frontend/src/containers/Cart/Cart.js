import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import CartItems from '../../components/CartItems/CartItems'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Cart.scss'

const Cart = (props) => {

    const { onFetchCart, token } = props;
    useEffect(() => {
        onFetchCart(token)
    }, [onFetchCart, token])

    const cartDeleteProductHandler = (token, productId) => {
        props.onCartDeleteProduct(token, productId)
    }

    let cartItems = <Spinner />
    if (!props.loading) {
        cartItems = <CartItems
            cartItems={props.cartItems}
            token={props.token}
            cartDeleteProduct={cartDeleteProductHandler} />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onCartDeleteProduct: (token, productId) => dispatch(actions.cartDeleteProduct(token, productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)