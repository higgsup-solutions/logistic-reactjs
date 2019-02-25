import React, {Component} from 'react';
import './register.scss';
import {Button, Card, Form, Input} from "element-react";
import {navigate} from "@reach/router";
import {register} from "../../integrate/auth";
import {FormattedMessage, injectIntl} from "react-intl";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                rules: {
                    email: [
                        {
                            required: true,
                            message: this.props.intl.formatMessage({id: 'register.validation.email.required'}),
                            trigger: 'change'
                        },
                        {
                            type: 'email',
                            message: this.props.intl.formatMessage({id: 'register.validation.email.invalid'}),
                            trigger: 'blur'
                        }
                    ],
                    password: {
                        required: true,
                        message: this.props.intl.formatMessage({id: 'register.validation.password.required'}),
                        trigger: 'change'
                    }
                }
            },
            user: {
                email: '',
                password: ''
            }
        };
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

                register(data).then(res => {
                    navigate('/public/login');
                });
            } else {
                return false;
            }
        });
    };


    render() {
        return (
            <Card className="register-container mb-5">
                <h3 className="pb-4">
                    <FormattedMessage id="register"/>
                </h3>

                <Form
                    ref="registerForm"
                    labelPosition="top" labelWidth="100"
                    model={this.state.user} rules={this.state.form.rules}
                    onSubmit={this.onSubmitRegister}>

                    <Form.Item
                        label={this.props.intl.formatMessage({id: 'email'})}
                        prop="email">
                        <Input
                            value={this.state.user.email}
                            onChange={this.onChangeInput('email')}/>
                    </Form.Item>

                    <div className="pb-2"/>

                    <Form.Item
                        label={this.props.intl.formatMessage({id: 'password'})}
                        prop="password">
                        <Input
                            type="password" value={this.state.user.password}
                            onChange={this.onChangeInput('password')}/>
                    </Form.Item>

                    <div className="pb-2"/>

                    <Form.Item className="mb-1">
                        <Button className="mr-5" type="primary" nativeType="submit">
                            <FormattedMessage id="register"/>
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default injectIntl(RegisterComponent);
