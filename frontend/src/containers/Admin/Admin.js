import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'

// import Products from '../../components/Products/Products'
import Product from '../../components/Products/Product/Product'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Admin.scss'

const Admin = (props) => {
    const { onFetchAdminProducts, token, userId } = props
    useEffect(() => {
        onFetchAdminProducts(token, userId)
        console.log('[component did mount refetch?]')
    }, [onFetchAdminProducts, token, userId])

    const deleteProductHandler = (token, productId) => {
        props.onAdminDeleteProduct(token, productId)
    }

    let products = <Spinner />
    if (props.products.length !== 0) {
        products = props.products.map(product => {
            return (
                <Product
                    key={product.id}
                    id={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    creatorId={product.userId}
                    isAdmin={true}
                    deleteProduct={() => deleteProductHandler(token, product.id)}
                />
            )
        })
        // products = <Products
        //     products={props.products}
        //     isAdmin={true} />
    } else {
        products = <h2>You have no products yet!</h2>
    }

    return (
        <>
            <h1>Admin Page</h1>
            {products}
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        products: state.admin.adminProducts,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminProducts: (token, userId) => dispatch(actions.fetchAdminProducts(token, userId)),
        onAdminDeleteProduct: (token, productId) => dispatch(actions.adminDeleteProduct(token, productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);