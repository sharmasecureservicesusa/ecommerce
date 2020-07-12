import React from 'react'
import './NavigationItem.scss'
import {NavLink} from 'react-router-dom'

const NavigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink 
            activeClassName="active" 
            exact={props.exact}
            to={props.link}>{props.children}</NavLink>
    </li>
)

export default NavigationItem