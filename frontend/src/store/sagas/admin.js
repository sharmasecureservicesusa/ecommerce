import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* fetchAdminProductsSaga(action) {
    yield put(actions.fetchAdminProductsStart())
    let url = 'http://localhost:8080/admin/products/'
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

export function* adminAddProductSaga(action) {
    yield put(actions.adminAddProductStart())
    let url = `http://localhost:8080/admin/add-product`
    let newProduct = {
        title: action.title,
        price: action.price,
        imageUrl: action.imageUrl,
        description: action.description
    }
    try {
        yield axios.post(url, newProduct, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        yield put(actions.adminAddProductSuccess())
    } catch (error) {
        yield put(actions.adminAddProductFail(error))
    }
}
