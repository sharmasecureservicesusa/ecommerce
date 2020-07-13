import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth'
import { fetchProductsSaga, fetchSingleProductSaga } from './shop'
import { fetchAdminProductsSaga, adminAddProductSaga, adminDeleteProductSaga, adminEditProductSaga } from './admin'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga), // a listener that listen to actionTypes
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}

export function* watchProduct() {
    yield all([
        takeEvery(actionTypes.FETCH_SINGLE_PRODUCT, fetchSingleProductSaga),
        takeEvery(actionTypes.FETCH_PRODUCTS, fetchProductsSaga)
    ])
}

export function* watchAdmin() {
    yield takeEvery(actionTypes.FETCH_ADMIN_PRODUCTS, fetchAdminProductsSaga)
    yield takeLatest(actionTypes.ADMIN_ADD_PRODUCT, adminAddProductSaga)
    yield takeLatest(actionTypes.ADMIN_DELETE_PRODUCT, adminDeleteProductSaga)
    yield takeLatest(actionTypes.ADMIN_EDIT_PRODUCT, adminEditProductSaga)
}
