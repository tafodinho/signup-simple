import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    Container,
    Row, Col, Form
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { renderField } from './renderField';
import { signupValidate, asyncValidate } from './validate';

import "./SignupForm.scss";

let SignupForm = ({
    formData
}) => {
    const [ok, setOk] = useState(false);
    const [state, setState] = useState({
        errorMessage: "",
        loading: false,
        success: true
    })

    const signupHandler = (e) => {
        e.preventDefault()
        const REQUEST_URL = "https://api.raisely.com/v3/";
        const { signUp: { values } } = formData;
        const data = {
            campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            data: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            }
        };
        setState({
            ...state,
            loading: true,
        })
        return axios.post(`${REQUEST_URL}signup`, data).then((res) => {
            console.log(res)
            if(res.status === 200) {
                setState({
                    errorMessage: "Creating User Success",
                    loading: false,
                    success: true
                })
            }
            formData.signUp.values.email = ""
        }).catch(err => {
            setState({
                errorMessage: "Error creating User",
                loading: false,
                success: false
            })
        })
        return false
    }

    useEffect(() => {
        if (!formData.signUp) return;
        if (!formData.signUp.syncErrors && !formData.signUp.asyncErrors) setOk(true);
        else setOk(false);
      }, [formData]);

    return (
        <Container className="form">
            {state.errorMessage && <span className={state.success ? 'clean' : 'error'}>{state.errorMessage}</span>}
            <h3>Create Account</h3>
            <Row>
                <Col sm={{size: 6, offset: 3}} className="right-side">
                    <Form onSubmit={signupHandler}>
                        <Row>
                            <Col>
                                <Field 
                                    name="firstName"
                                    id="firstname"
                                    type="text"
                                    component={renderField}
                                    placeholder="First Name"
                                />
                            </Col>
                            <Col>
                                <Field 
                                    name="lastName"
                                    id="lastname"
                                    type="text"
                                    component={renderField}
                                    placeholder="Last Name"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field 
                                    name="email"
                                    id="email"
                                    type="email"
                                    component={renderField}
                                    placeholder="Email"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field 
                                    name="password"
                                    id="password"
                                    type="password"
                                    component={renderField}
                                    placeholder="Password"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field 
                                    name="cpassword"
                                    id="cpassword"
                                    type="password"
                                    component={renderField}
                                    placeholder="Confirm Password"
                                />
                            </Col>
                        </Row>
                        <div className="submit-section">
                            <p>Have and account?<span> Sign In</span></p>
                            <button type="submit" className="btn btn-primary" disabled={!ok}>Sign Up</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

SignupForm = reduxForm({
    form: 'signUp',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: signupValidate,
    asyncValidate,
    asyncBlurFields: ['email'],
})(SignupForm);

const mapStateToProps = state => ({
    formData: state.form,
})
    

export default connect(
    mapStateToProps
)(SignupForm);