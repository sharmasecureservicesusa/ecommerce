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

export const adminAddProductSuccess = (newProduct) => {
    return {
        type: actionTypes.ADMIN_ADD_PRODUCT_SUCCESS,
        newProduct: newProduct
    }
}

export const adminAddProductFail = (error) => {
    return {
        type: actionTypes.ADMIN_ADD_PRODUCT_FAIL,
        error: error
    }
}

export const adminDeleteProduct = (token, productId) => {
    return {
        type: actionTypes.ADMIN_DELETE_PRODUCT,
        token: token,
        productId: productId
    }
}

export const adminDeleteProductStart = () => {
    return {
        type: actionTypes.ADMIN_DELETE_PRODUCT_START
    }
}

export const adminDeleteProductSuccess = (productId) => {
    return {
        type: actionTypes.ADMIN_DELETE_PRODUCT_SUCCESS,
        productId: productId
    }
}

export const adminDeleteProductFail = (error) => {
    return {
        type: actionTypes.ADMIN_DELETE_PRODUCT_FAIL,
        error: error
    }
}