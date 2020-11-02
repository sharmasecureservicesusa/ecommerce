import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

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
        },
        stock: {
            label: 'stock',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '1'
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

    let addProductRedirect = null
    const submitHandler = (event) => {
        event.preventDefault()
        let newProduct = {
            title: productForm.title.value,
            price: productForm.price.value,
            imageUrl: productForm.imageUrl.value,
            description: productForm.description.value,
            stock: productForm.stock.value
        }
        props.onAdminAddProduct(props.token, newProduct)
        // console.log('asyncronous after onAdminAddProducts')
        // history.push(props.adminRedirectPath)
    }

    if (props.productAdded) {
        addProductRedirect = <Redirect to={props.adminRedirectPath} />
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
                    <Button btnType="Default">SUBMIT</Button>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        productAdded: state.admin.productAdded,
        error: state.admin.error,
        adminRedirectPath: state.admin.adminRedirectPath,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdminAddProduct: (token, newProduct) => dispatch(actions.adminAddProduct(token, newProduct))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);