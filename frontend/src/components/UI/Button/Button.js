import React from 'react'
import { Link } from 'react-router-dom'
// import classes from './Button.scss'

import './Button.scss'
let classes = {
    'Button': 'Button',
    'Default': 'Default',
    'Success': 'Success',
    'Danger': 'Danger'
}

const Button = (props) => {
    if (props.href) {
        return (
            <a className={[classes.Button, classes[props.btnType]].join(' ')}
                href={props.href}>
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={[classes.Button, classes[props.btnType]].join(' ')}>
                {props.children}
            </Link>
        );
    }
    return (
        <button
            disabled={props.disabled}
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}>
            {props.children}
        </button>
    )
}

export default Button