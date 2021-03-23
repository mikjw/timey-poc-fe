import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  submitForm() {
    axios.post(`${process.env.REACT_APP_TIMEY_API_BASE_URL}/register`, {
      email: this.state.email,
      password: this.state.password
    })
    .then(res => {
      if (res.data.message === 'success') {
        this.props.history.push('/login');
      }
    })
  }

  render() {
    return (
      <div>
        <div className='Login-header'>
          Register
        </div>
          <label className='Login-label'> Email: </label> 
            <input className='Login-input' type='text' name='email' value={this.state.email} onChange={this.onChangeEmail} />
          <label className='Login-label'> Password: </label> 
            <input className='Login-input' type='password' name='password' value={this.state.password} onChange={this.onChangePassword} /> 
          <button className='Login-button' onClick={() => {this.submitForm()}}>✓</button>
      </div>
    );
  }
}