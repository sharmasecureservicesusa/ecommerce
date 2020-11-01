import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Orders.scss'

const Orders = (props) => {

    const { onFetchOrders, token, userId } = props;
    useEffect(() => {
        onFetchOrders(token, userId)
    }, [onFetchOrders, token, userId])

    let orders = <Spinner />
    if (!props.loading) {
        if (props.orders.length === 0) {
            orders = <h1>Nothing there!</h1>
        } else {
            orders = props.orders.map(order => (
                <Order
                    key={order.id}
                    products={order.products} />
            )
            )
        }
    }

    return (
        <>
            <h1>Orders Page</h1>
            {orders}
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        orders: state.order.orders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)