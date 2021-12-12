import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';

import swal from 'sweetalert';
import { login } from '../../utils';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);



export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  login = () => {

    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post(process.env.REACT_APP_BASE_URL +'auth/admin/login', {
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      this.props.history.push('/dashboard');
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        swal({
          text: err.response.data.message,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Breadcrumb />
        <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                
        <Card className="borderless text-center">
                        <Card.Body>

                        <div class="mb-4"><i class="feather icon-unlock auth-icon"></i></div>
                        <h3 class="mb-4">Login</h3>

          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={e=>this.setState({username: e.target.value})}
            placeholder="User Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={e=>this.setState({password: e.target.value})}
            placeholder="Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username == '' && this.state.password == ''}
            onClick={this.login.bind(this)}
          >
            Login
          </Button> 
        </Card.Body>
        </Card>
      </div>
      </div>
      </div>
    );
  }
}