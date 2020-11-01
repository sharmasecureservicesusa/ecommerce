import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth'
import { fetchProductsSaga, fetchSingleProductSaga, fetchCartSaga, cartAddProductSaga, cartDeleteProductSaga } from './shop'
import { fetchAdminProductsSaga, fetchAdminSingleProductSaga, adminAddProductSaga, adminDeleteProductSaga, adminEditProductSaga } from './admin'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga), // a listener that listen to actionTypes
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}

export function* watchShop() {
    yield all([
        takeEvery(actionTypes.FETCH_SINGLE_PRODUCT, fetchSingleProductSaga),
        takeEvery(actionTypes.FETCH_PRODUCTS, fetchProductsSaga),
        takeEvery(actionTypes.FETCH_CART, fetchCartSaga),
        takeEvery(actionTypes.CART_ADD_PRODUCT, cartAddProductSaga),
        takeEvery(actionTypes.CART_DELETE_PRODUCT, cartDeleteProductSaga)
    ])
}

export function* watchAdmin() {
    yield takeEvery(actionTypes.FETCH_ADMIN_PRODUCTS, fetchAdminProductsSaga)
    yield takeEvery(actionTypes.FETCH_ADMIN_SINGLE_PRODUCT, fetchAdminSingleProductSaga)
    yield takeLatest(actionTypes.ADMIN_ADD_PRODUCT, adminAddProductSaga)
    yield takeLatest(actionTypes.ADMIN_DELETE_PRODUCT, adminDeleteProductSaga)
    yield takeLatest(actionTypes.ADMIN_EDIT_PRODUCT, adminEditProductSaga)
}
