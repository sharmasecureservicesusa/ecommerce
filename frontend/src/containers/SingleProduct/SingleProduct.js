import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './SingleProduct.scss'

const SingleProduct = (props) => {

    const { onFetchSingleProduct } = props;
    const productId = props.match.params.productId
    useEffect(() => {
        onFetchSingleProduct(productId)
    }, [onFetchSingleProduct, productId])

    let singleProduct = <Spinner />
    if (props.product) {
        singleProduct = (
            <div className="SingleProduct">
                <h1>{props.product.title}</h1>
                <img src={props.product.imageUrl} alt={props.product.title} />
                <div>${props.product.price}</div>
                <p>{props.product.description}</p>
            </div>
        )
    }

    return (
        <>
            <h1>Single Product Page</h1>
            {singleProduct}
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.shop.loading,
        product: state.shop.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSingleProduct: (productId) => dispatch(actions.fetchSingleProduct(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)