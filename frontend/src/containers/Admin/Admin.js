import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'

import Product from '../../components/Product/Product'
// import Product from '../../components/Products/Product/Product'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Admin.scss'

const Admin = (props) => {
    const {
        onFetchAdminProducts,
        onAdminStateInit,
        token,
        userId,
        adminProducts
    } = props

    useEffect(() => {
        onAdminStateInit()
        onFetchAdminProducts(token, userId)
    }, [onFetchAdminProducts, onAdminStateInit, token, userId])

    const deleteProductHandler = (token, productId) => {
        props.onAdminDeleteProduct(token, productId)
    }

    let products = <Spinner />
    if (adminProducts.length !== 0) {
        products = adminProducts.map(product => (
            <Product
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                description={product.description}
                stock={product.stock}
                creatorId={product.userId}
                isAdmin={true} // TODO: add another state to manage isAdmin
                deleteProduct={() => deleteProductHandler(props.token, product.id)}
            />
        ))
    } else {
        products = <h2>You have no products yet!</h2>
    }

    return (
        <>
            <h1>Admin Page</h1>
            <div className="ProductList">
                {products}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        adminProducts: state.admin.adminProducts,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminProducts: (token, userId) => dispatch(actions.fetchAdminProducts(token, userId)),
        onAdminStateInit: () => dispatch(actions.adminStateInit()),
        onAdminDeleteProduct: (token, productId) => dispatch(actions.adminDeleteProduct(token, productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);