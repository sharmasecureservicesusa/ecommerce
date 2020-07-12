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

    let products = <Spinner />
    if (!props.loading) {
        products = <Products products={props.products} />
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
        products: state.shop.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch(actions.fetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)