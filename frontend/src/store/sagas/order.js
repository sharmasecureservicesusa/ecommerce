import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())
    let url =  process.env.REACT_APP_BACKEND_URL + '/order/'
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
    let url = process.env.REACT_APP_BACKEND_URL + '/create-order'
    try {
        const { error, paymentMethod } = yield action.stripe.createPaymentMethod({
            type: 'card',
            card: action.cardElement,
        });
        if (error) {
            console.log('[error]', error);
            throw new Error(error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const paymentData = {
            amount: action.amount,
            ...action.userData,
            ...paymentMethod
        }
        const response = yield axios.post(url, paymentData, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        console.log('[placeOrderSaga] response.data:', response.data)
        yield put(actions.placeOrderSuccess(response.data))
    } catch (error) {
        yield put(actions.placeOrderFail(error))
    }
}