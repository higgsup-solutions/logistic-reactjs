import React, {Component} from 'react';
import './login.scss';
import {login} from '../../integrate/auth';
import {navigate} from "@reach/router";
import {Button, Checkbox, Form, Input} from 'element-react';
import TokenStorage from "../../utils/token";

class LoginComponent extends Component {
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

    onSubmitLogin = (e) => {
        e.preventDefault();

        const data = {
            email: this.state.user.email,
            password: this.state.user.password
        };

        login(data).then(res => {
            let authToken = {
                accessToken: `Bearer ${res.token}`,
                refreshToken: `Bearer ${res.refreshToken}`
            };

            TokenStorage.store(authToken);
            navigate(`/`);
        });
    };


    render() {

        return (
            <div className="login-container p-4 mb-5">
                <h3 className="pb-4">Login</h3>

                <Form
                    labelPosition="top" labelWidth="100"
                    model={this.state.user} rules={this.state.form.rules}
                    onSubmit={this.onSubmitLogin}>

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

                    <Form.Item>
                        <Button className="mr-5" type="primary" nativeType="submit">Login</Button>
                        <Checkbox checked>Remember me</Checkbox>
                        <div>
                            <a href="#">Lost your password?</a>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default LoginComponent;
