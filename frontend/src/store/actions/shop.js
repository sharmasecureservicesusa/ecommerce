import * as actionTypes from './actionTypes'

export const fetchProducts = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS
    }
}

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START,
    }
}

export const fetchProductsSuccess = (products) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

export const fetchProductsFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    }
}

export const fetchSingleProduct = (productId) => {
    return {
        type: actionTypes.FETCH_SINGLE_PRODUCT,
        productId: productId
    }
}

export const fetchSingleProductStart = () => {
    return {
        type: actionTypes.FETCH_SINGLE_PRODUCT_START,
    }
}

export const fetchSingleProductSuccess = (product) => {
    return {
        type: actionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
        product: product
    }
}

export const fetchSingleProductFail = (error) => {
    return {
        type: actionTypes.FETCH_SINGLE_PRODUCT_FAIL,
        error: error
    }
}

export const fetchCart = (token) => {
    return {
        type: actionTypes.FETCH_CART,
        token: token
    }
}

export const fetchCartStart = () => {
    return {
        type: actionTypes.FETCH_CART_START
    }
}

export const fetchCartSuccess = (cartItems) => {
    return {
        type: actionTypes.FETCH_CART_SUCCESS,
        cartItems: cartItems
    }
}

export const fetchCartFail = () => {
    return {
        type: actionTypes.FETCH_CART_FAIL
    }
}

export const cartAddProduct = (token, productId) => {
    return {
        type: actionTypes.CART_ADD_PRODUCT,
        token: token,
        productId: productId
    }
}

export const cartAddProductStart = () => {
    return {
        type: actionTypes.CART_ADD_PRODUCT_START
    }
}

export const cartAddProductSuccess = (cartItems) => {
    return {
        type: actionTypes.CART_ADD_PRODUCT_SUCCESS,
        cartItems: cartItems
    }
}

export const cartAddProductFail = () => {
    return {
        type: actionTypes.CART_ADD_PRODUCT_FAIL
    }
}

export const cartDeleteProduct = (token, productId) => {
    return {
        type: actionTypes.CART_DELETE_PRODUCT,
        token: token,
        productId: productId
    }
}

export const cartDeleteProductStart = () => {
    return {
        type: actionTypes.CART_DELETE_PRODUCT_START
    }
}

export const cartDeleteProductSuccess = (productId) => {
    return {
        type: actionTypes.CART_DELETE_PRODUCT_SUCCESS,
        productId: productId
    }
}

export const cartDeleteProductFail = () => {
    return {
        type: actionTypes.CART_DELETE_PRODUCT_FAIL
    }
}