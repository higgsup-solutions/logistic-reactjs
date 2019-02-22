import React, {Component} from 'react';
import './register.scss';
import {Button, Form, Input} from "element-react";
import TokenStorage from "../../utils/token";
import {navigate} from "@reach/router";
import {register} from "../../integrate/auth";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                rules: {
                    email: [
                        {
                            required: true,
                            message: 'Email address is required',
                            trigger: 'change'
                        },
                        {
                            type: 'email',
                            message: 'Email address is invalid',
                            trigger: 'blur'
                        }
                    ],
                    password: {
                        required: true,
                        message: 'Password is required',
                        trigger: 'change'
                    }
                }
            },
            user: {
                email: '',
                password: ''
            }
        };

        if(TokenStorage.isTokenPresent()) {
            navigate(`/`);
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = Object.assign({}, this.state);
        newState.user[fieldName] = e;
        this.setState(newState);
    };

    onSubmitRegister = (e) => {
        e.preventDefault();

        this.refs.registerForm.validate((valid) => {
            if (valid) {
                const data = {
                    email: this.state.user.email,
                    password: this.state.user.password
                };

                console.log(data);

                register(data).then(res => {
                    console.log(res);
                    navigate('/public/login');
                });
            } else {
                return false;
            }
        });
    };


    render() {

        return (
            <div className="register-container p-4 mb-5">
                <h3 className="pb-4">Register</h3>

                <Form
                    ref="registerForm"
                    labelPosition="top" labelWidth="100"
                    model={this.state.user} rules={this.state.form.rules}
                    onSubmit={this.onSubmitRegister}>

                    <Form.Item label="Email address" prop="email">
                        <Input
                            value={this.state.user.email}
                            onChange={this.onChangeInput('email')}/>
                    </Form.Item>

                    <div className="pb-2"/>

                    <Form.Item label="Password" prop="password">
                        <Input
                            type="password" value={this.state.user.password}
                            onChange={this.onChangeInput('password')}/>
                    </Form.Item>

                    <div className="pb-2"/>

                    <Form.Item className="mb-1">
                        <Button className="mr-5" type="primary" nativeType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default RegisterComponent;
