import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { updateObject, checkValidity } from '../../shared/utility'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Auth.scss'

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        firstName: {
            label: 'first name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        lastName: {
            label: 'last name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            label: 'email',
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            label: 'password',
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })

    const [isSignup, setIsSignup] = useState(false)

    // componentDidMount
    // useEffect(() => {
    //     console.log('[Auth.js] componentDidMount')
    // }, [])
    const { onSetAuthRedirectPath, authRedirectPath } = props
    useEffect(() => {
        if (authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }, [onSetAuthRedirectPath, authRedirectPath])


    const inputChangeHandler = (event, controlName) => {
        // console.log(event.target.value)
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        })
        setAuthForm(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(
            authForm.firstName.value,
            authForm.lastName.value,
            authForm.email.value,
            authForm.password.value,
            isSignup
        )
        setIsSignup(!isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

    const formElementsArray = []
    for (let key in authForm) {
        if (!isSignup && (key !== "email" && key !== "password"))
            continue
        formElementsArray.push({
            id: key,
            config: authForm[key]
        })
    }

    let form = formElementsArray.map(formElement => {
        return (
            <Input
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangeHandler(event, formElement.id)} />
        )
    })
    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />
    }

    return (
        <div className="Auth">
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
                {errorMessage}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignup ? 'LOGIN' : 'SIGNUP'} MODE</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName, lastName, email, password, isSignup) => dispatch(actions.auth(firstName, lastName, email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)