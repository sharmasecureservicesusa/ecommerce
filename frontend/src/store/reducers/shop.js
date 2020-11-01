import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    products: [],
    product: null, // single product
    cartItems: [],
    loading: false,
    error: false,
}

const fetchProductsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchProductsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        products: action.products
    })
}

const fetchProductsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const fetchSingleProductStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchSingleProductSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        product: action.product
    })
}

const fetchSingleProductFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const fetchCartStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    })
}

const fetchCartSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        cartItems: action.cartItems
    })
}

const fetchCartFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const cartAddProductStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const cartAddProductSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        cartItems: action.cartItems
    })
}

const cartAddProductFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const cartDeleteProductStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const cartDeleteProductSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        cartItems: action.cartItems
    })
}

const cartDeleteProductFail = (state, action) => {
    const updatedCartItems = state.cartItems.filter(p => p.id !== action.productId)
    return updateObject(state, {
        loading: false,
        cartItems: updatedCartItems
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_START:
            return fetchProductsStart(state, action)
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return fetchProductsSuccess(state, action)
        case actionTypes.FETCH_PRODUCTS_FAIL:
            return fetchProductsFail(state, action)
        case actionTypes.FETCH_SINGLE_PRODUCT_START:
            return fetchSingleProductStart(state, action)
        case actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
            return fetchSingleProductSuccess(state, action)
        case actionTypes.FETCH_SINGLE_PRODUCT_FAIL:
            return fetchSingleProductFail(state, action)
        case actionTypes.FETCH_CART_START:
            return fetchCartStart(state, action)
        case actionTypes.FETCH_CART_SUCCESS:
            return fetchCartSuccess(state, action)
        case actionTypes.FETCH_CART_FAIL:
            return fetchCartFail(state, action)
        case actionTypes.CART_ADD_PRODUCT_START:
            return cartAddProductStart(state, action)
        case actionTypes.CART_ADD_PRODUCT_SUCCESS:
            return cartAddProductSuccess(state, action)
        case actionTypes.CART_ADD_PRODUCT_FAIL:
            return cartAddProductFail(state, action)
        case actionTypes.CART_DELETE_PRODUCT_START:
            return cartDeleteProductStart(state, action)
        case actionTypes.CART_DELETE_PRODUCT_SUCCESS:
            return cartDeleteProductSuccess(state, action)
        case actionTypes.CART_DELETE_PRODUCT_FAIL:
            return cartDeleteProductFail(state, action)
        default:
            return state
    }
}

export default reducer