import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'

import Products from '../../components/Products/Products'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Admin.scss'

const Admin = (props) => {
    const { onFetchAdminProducts, token, userId } = props
    useEffect(() => {
        onFetchAdminProducts(token, userId)
    }, [onFetchAdminProducts, token, userId])

    let products = <Spinner />
    if (!props.loading) {
        products = <Products products={props.products} isAdmin={true}/>
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
        onFetchAdminProducts: (token, userId) => dispatch(actions.fetchAdminProducts(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);