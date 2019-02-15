import React, {Component} from 'react';
import './login.scss';
import intergrate from './../../intergrate/intergrate';
import {login} from './../../intergrate/auth';
import { navigate } from "@reach/router";
import {Form, Input, Button} from 'element-react';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        if(localStorage.getItem("authentication")) {
            navigate(`/`);
        }
    }

    onChangeInput = (input) => (e) => {
        let newState = this.state;
        newState[input] = e;
        this.setState(newState);
    };

    onLogin = (e) => {
        e.preventDefault();
        const data = {
            client_id: 1,
            client_secret: '123456',
            grant_type: 'password',
            username: this.state.username,
            password: this.state.password
        };
        login(data).then(res => {
            if (res.success) {
                localStorage.setItem('authentication', `Bearer ${res.data.accessToken}`);
                navigate(`/`);
            } else {
                alert('sai pass hoac username');
            }
        })
    };


    render() {

        return (
            <div className="login-container p-4">
                <h3>Login</h3>
                <Form className="en-US" model={this.state.form} labelWidth="120" onSubmit={this.onLogin}>
                    <Form.Item label="Username">
                        <Input value={this.state.username} onChange={this.onChangeInput('username')}></Input>
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input value={this.state.password} onChange={this.onChangeInput('password')}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit">Login</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default LoginComponent;
