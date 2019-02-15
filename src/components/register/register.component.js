import React, {Component} from 'react';
import './register.scss';
import {Button, Form, Input} from "element-react";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            phone: '',
            email: ''
        };
    }

    onChangeInput = (input) => (e) => {
        let newState = this.state;
        newState[input] = e;
        this.setState(newState);
    };

    onRegister = (e) => {
        e.preventDefault();
        console.log(this.state);
    };


    render() {

        return (
            <div className="login-container p-4">
                <h3>Register</h3>
                <Form className="en-US" model={this.state.form} labelWidth="120" onSubmit={this.onRegister}>
                    <Form.Item label="Username">
                        <Input value={this.state.username} onChange={this.onChangeInput('username')}></Input>
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input value={this.state.password} onChange={this.onChangeInput('password')}></Input>
                    </Form.Item>
                    <Form.Item label="Phone">
                        <Input value={this.state.phone} onChange={this.onChangeInput('phone')}></Input>
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input value={this.state.email} onChange={this.onChangeInput('email')}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default RegisterComponent;
