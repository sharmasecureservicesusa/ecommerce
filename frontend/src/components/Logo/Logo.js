import React from 'react'

// make webpack aware of this image
import burgerLogo from '../../assets/images/logo.png'

import './Logo.scss'

const Logo = (props) => (
    <div className="MyLogo" style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
)

export default Logo