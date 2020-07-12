import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

import './AddProduct.scss'

const AddProduct = (props) => {
    const [productForm, setProdctForm] = useState({
        title: {
            label: 'title',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'title'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        price: {
            label: 'price',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'price'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        imageUrl: {
            label: 'imageUrl',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'imageUrl'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        description: {
            label: 'description',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'description'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    })

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(productForm, {
            [controlName]: updateObject(productForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, productForm[controlName].validation),
                touched: true
            })
        })
        setProdctForm(updatedControls)
    }

    const history = useHistory()
    let addProductRedirect = null
    const submitHandler = (event) => {
        event.preventDefault()
        props.onAdminAddProducts(
            props.token,
            productForm.title.value,
            productForm.price.value,
            productForm.imageUrl.value,
            productForm.description.value
        )
        history.push(props.adminRedirectPath)
    }

    const formElementsArray = []
    for (let key in productForm) {
        formElementsArray.push({
            id: key,
            config: productForm[key]
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

    return (
        <>
            <h1>AddProduct Page</h1>
            <div className="AddProduct">
                {addProductRedirect}
                <form onSubmit={submitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        error: state.admin.error,
        adminRedirectPath: state.admin.adminRedirectPath,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdminAddProducts: (token, title, price, imageUrl, description) => dispatch(actions.adminAddProduct(token, title, price, imageUrl, description))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);