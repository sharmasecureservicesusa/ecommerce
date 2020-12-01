import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* fetchProductsSaga(action) {
    yield put(actions.fetchProductsStart())
    let url = process.env.REACT_APP_BACKEND_URL + '/products/'
    try {
        const response = yield axios.get(url)
        yield put(actions.fetchProductsSuccess(response.data.products))
    } catch (error) {
        yield put(actions.fetchProductsFail(error))
    }
}

export function* fetchSingleProductSaga(action) {
    yield put(actions.fetchSingleProductStart())
    let url = process.env.REACT_APP_BACKEND_URL + '/products/' + action.productId
    try {
        const response = yield axios.get(url)
        console.log('[fetchSingleProductSaga] response.data:', response.data)
        yield put(actions.fetchSingleProductSuccess(response.data.product))
    } catch (error) {
        yield put(actions.fetchSingleProductFail(error))
    }
}

export function* fetchCartSaga(action) {
    yield put(actions.fetchCartStart())
    let url = process.env.REACT_APP_BACKEND_URL + '/cart/'
    try {
        const response = yield axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        console.log('[fetchCartSaga] response.data:', response.data)
        yield put(actions.fetchCartSuccess(response.data.products))
    } catch (error) {
        yield put(actions.fetchCartFail(error))
    }
}

export function* cartAddProductSaga(action) {
    yield put(actions.cartAddProductStart())
    let url = process.env.REACT_APP_BACKEND_URL + '/cart/'
    let productToAdd = {
        productId: action.productId
    }
    try {
        const response = yield axios.post(url, productToAdd, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        console.log('[cartAddProductSaga] response.data:', response.data)
        yield put(actions.cartAddProductSuccess(response.data.products))
    } catch (error) {
        yield put(actions.cartAddProductFail(error))
    }
}

export function* cartDeleteProductSaga(action) {
    yield put(actions.cartDeleteProductStart())
    let url = process.env.REACT_APP_BACKEND_URL + '/cart-delete-item/'
    let productToDelete = {
        productId: action.productId
    }
    try {
        const response = yield axios.post(url, productToDelete, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        console.log('[cartDeleteProductSaga] response.data:', response.data)
        yield put(actions.cartDeleteProductSuccess(action.productId))
    } catch (error) {
        yield put(actions.cartDeleteProductFail(error))
    }
}