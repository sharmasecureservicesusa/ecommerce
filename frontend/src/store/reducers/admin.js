import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    adminProducts: null,
    adminRedirectPath: '/admin',
    loading: false,
    error: false,
}

const fetchAdminProductsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchAdminProductsSuccess = (state, action) => {
    return updateObject(state, {
        adminProducts: action.adminProducts,
        loading: false,
        error: false
    })
}

const fetchAdminProductsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const adminAddProductStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const adminAddProductSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        adminRedirectPath: '/admin'
    })
}

const adminAddProductFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        adminRedirectPath: '/admin/add-product'
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ADMIN_PRODUCTS_START:
            return fetchAdminProductsStart(state, action)
        case actionTypes.FETCH_ADMIN_PRODUCTS_SUCCESS:
            return fetchAdminProductsSuccess(state, action)
        case actionTypes.FETCH_ADMIN_PRODUCTS_FAIL:
            return fetchAdminProductsFail(state, action)
        case actionTypes.ADMIN_ADD_PRODUCT_START:
            return adminAddProductStart(state, action)
        case actionTypes.ADMIN_ADD_PRODUCT_SUCCESS:
            return adminAddProductSuccess(state, action)
        case actionTypes.ADMIN_ADD_PRODUCT_FAIL:
            return adminAddProductFail(state, action)
        default:
            return state
    }
}

export default reducer