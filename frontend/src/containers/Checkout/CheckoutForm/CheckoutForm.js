import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { updateObject, checkValidity } from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/index'

import './CheckoutForm.scss'

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const [checkoutForm, setCheckoutForm] = useState({
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
        mobile: {
            label: 'mobile',
            elementType: 'input',
            elementConfig: {
                type: 'tel',
                placeholder: 'Mobile'
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        address: {
            label: 'Address',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    })

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(checkoutForm, {
            [controlName]: updateObject(checkoutForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, checkoutForm[controlName].validation),
                touched: true
            })
        })
        setCheckoutForm(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const userData = {
            firstName: checkoutForm.firstName.value,
            lastName: checkoutForm.lastName.value,
            email: checkoutForm.email.value,
            mobile: checkoutForm.mobile.value,
            address: checkoutForm.address.value,
            deliveryMethod: checkoutForm.deliveryMethod.value
        }
        const cardElement = elements.getElement(CardElement)
        console.log('cardElement: ', cardElement)
        props.onPlaceOrder(props.token, props.amount, userData, stripe, cardElement)
    }

    const formElementsArray = []
    for (let key in checkoutForm) {
        formElementsArray.push({
            id: key,
            config: checkoutForm[key]
        })
    }

    let userDataForm = formElementsArray.map(formElement => {
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

    let creditCardForm = (
        <div className="CheckoutForm">
            <p>Amount: ${props.amount}</p>
            <form onSubmit={submitHandler}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button type="submit" btnType="Default">
                    Pay
                </Button>
            </form>
        </div>
    )
    
    let form = (
        <div>
            {props.loading ? <Spinner /> : null}
            {userDataForm}
            {creditCardForm}
        </div>
    )

    return (
        <>
            {form}
        </>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        token: state.auth.token,
        cartItems: state.shop.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlaceOrder: (token, amount, userData, stripe, cardElement) => dispatch(actions.placeOrder(token, amount, userData, stripe, cardElement))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)