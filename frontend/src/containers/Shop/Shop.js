import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Products from '../../components/Products/Products'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Shop.scss'

const Shop = (props) => {

    const { onFetchProducts } = props;
    useEffect(() => {
        onFetchProducts()
    }, [onFetchProducts])

    const cartAddProductHandler = (token, productId) => {
        console.log('[cartAddProductHandler]')
        props.onCartAddProduct(token, productId)
    }

    let products = <Spinner />
    if (!props.loading) {
        products = <Products
            products={props.products}
            token={props.token}
            cartAddProduct={cartAddProductHandler} />
    }

    return (
        <>
            <h1>Shop Page</h1>
            {products}
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.shop.loading,
        token: state.auth.token,
        products: state.shop.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch(actions.fetchProducts()),
        onCartAddProduct: (token, productId) => dispatch(actions.cartAddProduct(token, productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)