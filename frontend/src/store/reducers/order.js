import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    // sessionId: null
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
};

const placeOrderInit = (state, action) => {
    return updateObject(state, {
        purchased: false
    })
}

const placeOrderStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const placeOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        purchased: action.response.success === true,
        // sessionId: action.response.sessionId
    })
}

const placeOrdersFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(state, action)
        case actionTypes.PLACE_ORDERS_INIT:
            return placeOrderInit(state, action)
        case actionTypes.PLACE_ORDERS_START:
            return placeOrderStart(state, action)
        case actionTypes.PLACE_ORDERS_SUCCESS:
            return placeOrderSuccess(state, action)
        case actionTypes.PLACE_ORDERS_FAIL:
            return placeOrdersFail(state, action)
        default:
            return state
    }
}

export default reducer