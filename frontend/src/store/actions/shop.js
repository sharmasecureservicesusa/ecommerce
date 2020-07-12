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