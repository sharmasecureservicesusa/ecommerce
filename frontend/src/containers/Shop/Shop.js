import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Product from '../../components/Product/Product'
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
        products = props.products.map(product => (
            <Product
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                description={product.description}
                stock={product.stock}
                creatorId={product.userId}
                isAuth={props.isAuth}
                cartAddProduct={() => cartAddProductHandler(props.token, product.id)}
            />
        ))
    }

    return (
        <>
            <h1>Shop Page</h1>
            <div className="ProductList">
                {products}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.shop.loading,
        token: state.auth.token,
        isAuth: state.auth.token !== null,
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