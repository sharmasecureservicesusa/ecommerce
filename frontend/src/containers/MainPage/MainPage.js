import React from 'react'
import { connect } from 'react-redux'

const MainPage = (props) => {
    return (
        <div>
            <h1>Main Page</h1>
            <h2>Welcome to ecommerce fun!</h2>
            <h3>List some of the best selling products here...</h3>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);