import React from 'react'
import './NavigationItems.scss'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Main Page</NavigationItem>
        <NavigationItem link="/shop" exact>Shop</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/admin">Admin</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/admin/add-product">Add Product</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/cart">Cart</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/orders">Order</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
)

export default NavigationItems