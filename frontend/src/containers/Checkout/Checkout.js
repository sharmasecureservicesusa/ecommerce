import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm/CheckoutForm'

import CartItem from '../../components/CartItem/CartItem'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Checkout.scss'


const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Checkout = props => {

    const { onPlaceOrderInit, purchased, token } = props;
    useEffect(() => {
        onPlaceOrderInit()
    }, [onPlaceOrderInit, purchased, token])

    let purchasedRedirect = null
    if (purchased) {
        purchasedRedirect = <Redirect to="/orders" />
    }

    let totalPrice = 0
    let cartItems = <Spinner />
    if (!props.loading) {
        cartItems =
            <>
                <ul className="CartItemList">
                    {props.cartItems.map(product => {
                        // console.log('deletedAt:', product.deletedAt)
                        if (product.deletedAt === null) {
                            // cannotPlaceOeder = false
                        }
                        totalPrice = totalPrice + product.cartItem.quantity * product.price
                        return <CartItem
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            available={product.deletedAt === null}
                            quantity={product.cartItem.quantity}
                            price={product.price}
                            isCheckout={true}
                        />
                    })}
                </ul>
            </>
    }
    return (
        <>
            <h1>Checkout Page</h1>
            {cartItems}
            {purchasedRedirect}
            <h1>Total Price: {totalPrice}</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm amount={totalPrice} />
            </Elements>
        </>
    );
};

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
        onPlaceOrderInit: () => dispatch(actions.placeOrderInit()),
        onPlaceOrder: (token, stripe, cardElement) => dispatch(actions.placeOrder(token, stripe, cardElement))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)