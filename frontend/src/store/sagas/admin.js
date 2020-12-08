import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* fetchAdminProductsSaga(action) {
    yield put(actions.fetchAdminProductsStart())
    let url = '/api/admin/products/'
    try {
        const response = yield axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        // console.log('[fetchAdminProductsSaga] response.data:', response.data)
        yield put(actions.fetchAdminProductsSuccess(response.data.products))
    } catch (error) {
        yield put(actions.fetchAdminProductsFail(error))
    }
}

export function* fetchAdminSingleProductSaga(action) {
    yield put(actions.fetchAdminSingleProductStart())
    let url = '/api/admin/edit-product/' + action.productId
    try {
        const response = yield axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        console.log('[fetchAdminProductsSaga] response.data:', response.data)
        yield put(actions.fetchAdminSingleProductSuccess(response.data.product))
    } catch (error) {
        yield put(actions.fetchAdminSingleProductFail(error))
    }
}

export function* adminAddProductSaga(action) {
    yield put(actions.adminAddProductStart())
    let url = '/api/admin/add-product'
    let newProduct = action.newProduct
    try {
        const response = yield axios.post(url, newProduct, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        yield put(actions.adminAddProductSuccess(response.data.product))
    } catch (error) {
        yield put(actions.adminAddProductFail(error))
    }
}

export function* adminDeleteProductSaga(action) {
    yield put(actions.adminDeleteProductStart())
    let url = '/api/admin/delete-product'
    let productToDelete = {
        productId: action.productId
    }
    try {
        yield axios.post(url, productToDelete, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        yield put(actions.adminDeleteProductSuccess(action.productId))
    } catch (error) {
        yield put(actions.adminDeleteProductFail(error))
    }
}

export function* adminEditProductSaga(action) {
    yield put(actions.adminEditProductStart())
    let url = '/api/admin/edit-product'
    let editedProductInfo = {
        productId: action.productId,
        ...action.editedProduct
    }
    try {
        const response = yield axios.post(url, editedProductInfo, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        yield put(actions.adminEditProductSuccess(response.data.product.id, response.data.product))
    } catch (error) {
        yield put(actions.adminEditProductFail(error))
    } 
}
