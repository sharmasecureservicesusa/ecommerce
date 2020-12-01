import * as actionTypes from './actionTypes'


export const fetchOrders = (token) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const placeOrderInit = () => {
    return {
        type: actionTypes.PLACE_ORDERS_INIT
    }
}

export const placeOrder = (token, amount, userData, stripe, cardElement) => {
    return {
        type: actionTypes.PLACE_ORDERS,
        token: token,
        amount: amount,
        userData: userData,
        stripe: stripe,
        cardElement: cardElement
    }
}

export const placeOrderStart = () => {
    return {
        type: actionTypes.PLACE_ORDERS_START
    }
}

export const placeOrderSuccess = (response) => {
    return {
        type: actionTypes.PLACE_ORDERS_SUCCESS,
        response: response
    }
}

export const placeOrderFail = (error) => {
    return {
        type: actionTypes.PLACE_ORDERS_FAIL,
        error: error
    }
}