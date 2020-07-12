import { takeEvery, all } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth'
import { fetchProductsSaga, fetchSingleProductSaga } from './shop'
import { fetchAdminProductsSaga, adminAddProductSaga } from './admin'

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
        yield takeEvery(actionTypes.FETCH_SINGLE_PRODUCT, fetchSingleProductSaga),
        yield takeEvery(actionTypes.FETCH_PRODUCTS, fetchProductsSaga)
    ])
}

export function* watchAdmin() {
    yield all([
        yield takeEvery(actionTypes.FETCH_ADMIN_PRODUCTS, fetchAdminProductsSaga),
        yield takeEvery(actionTypes.ADMIN_ADD_PRODUCT, adminAddProductSaga)
    ])
}
