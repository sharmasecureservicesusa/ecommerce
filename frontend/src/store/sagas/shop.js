import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* fetchProductsSaga(action) {
    yield put(actions.fetchProductsStart())
    let url = 'http://localhost:8080/api/products/'
    try {
        const response = yield axios.get(url)
        yield put(actions.fetchProductsSuccess(response.data.products))
    } catch (error) {
        yield put(actions.fetchProductsFail(error))
    }
}

export function* fetchSingleProductSaga(action) {
    yield put(actions.fetchSingleProductStart())
    let url = 'http://localhost:8080/api/products/' + action.productId
    try {
        const response = yield axios.get(url)
        console.log('[fetchSingleProductSaga] response.data:', response.data)
        yield put(actions.fetchSingleProductSuccess(response.data.product))
    } catch (error) {
        yield put(actions.fetchSingleProductFail(error))
    }
}
