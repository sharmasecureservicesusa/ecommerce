import * as actionTypes from './actionTypes'

export const fetchAdminProducts = (token, userId) => {
    return {
        type: actionTypes.FETCH_ADMIN_PRODUCTS,
        token: token,
        userId: userId
    }
}

export const fetchAdminProductsStart = () => {
    return {
        type: actionTypes.FETCH_ADMIN_PRODUCTS_START,
    }
}

export const fetchAdminProductsSuccess = (products) => {
    return {
        type: actionTypes.FETCH_ADMIN_PRODUCTS_SUCCESS,
        adminProducts: products
    }
}

export const fetchAdminProductsFail = (error) => {
    return {
        type: actionTypes.FETCH_ADMIN_PRODUCTS_FAIL,
        error: error
    }
}

export const adminAddProduct = (token, title, price, imageUrl, description) => {
    return {
        type: actionTypes.ADMIN_ADD_PRODUCT,
        token: token,
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }
}

export const adminAddProductStart = () => {
    return {
        type: actionTypes.ADMIN_ADD_PRODUCT_START
    }
}

export const adminAddProductSuccess = () => {
    return {
        type: actionTypes.ADMIN_ADD_PRODUCT_SUCCESS
    }
}

export const adminAddProductFail = (error) => {
    return {
        type: actionTypes.ADMIN_ADD_PRODUCT_FAIL,
        error: error
    }
}
