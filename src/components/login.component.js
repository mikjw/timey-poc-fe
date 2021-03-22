import './login.component.css';
import React, { Component } from 'react';
import axios from 'axios';
export default class Login extends Component {
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

  submitForm(e) {
      axios.post('http://localhost:5001/login', {
        withCredentials: true,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
        if (res.data.id && res.data.message === 'success') {
          localStorage.setItem('userId', res.data.id)
          this.props.history.push('/times');
        }
      });
  }

  getUser() {
    axios.get('http://localhost:5001/requser', {
      withCredentials: true
    })
    .then((res) => {
        this.setState({requser: res.data});
    });
  };

  render() {
    return (
      <div>
        <div>
        <div className='Login-header'>
          Log in
        </div>
        <div className='Login-container'>
          <label className='Login-label'> Email: </label> 
          <input className='Login-input' type='text' name='email' value={this.state.email} onChange={this.onChangeEmail} />
          <label className='Login-label'> Password: </label> 
          <input className='Login-input' type='password' name='password' value={this.state.password} onChange={this.onChangePassword} /> 
          <button className='Login-button' onClick={() => {this.submitForm()}}>✓</button>
        </div>
        </div>
      </div>
    );
  }
}
