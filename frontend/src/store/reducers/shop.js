import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    products: [],
    product: null, // single product
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
        default:
            return state
    }
}

export default reducer