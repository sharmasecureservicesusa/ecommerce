import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())
    let url = 'http://localhost:8080/api/order/'
    try {
        const response = yield axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        console.log('[fetchOrdersSaga] response.data:', response.data)
        yield put(actions.fetchOrdersSuccess(response.data.orders))
    } catch (error) {
        yield put(actions.fetchOrdersFail(error))
    }
}

export function* placeOrderSaga(action) {
    yield put(actions.placeOrderStart())
    let url = `http://localhost:8080/api/create-order`
    try {
        const response = yield axios.post(url, {}, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        console.log('[placeOrderSaga] response.data:', response.data)
        yield put(actions.placeOrderSuccess())
    } catch (error) {
        yield put(actions.placeOrderFail(error))
    }
}