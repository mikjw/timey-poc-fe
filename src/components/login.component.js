import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
      });
  }

getUser() {
  axios.get('http://localhost:5001/requser', {
    withCredentials: true
  })
  .then((res) => {
      this.setState({requser: res.data});
      console.log('this.state.requser: ', this.state.requser);
    });
  };

  render() {
    return (
      <div>
        <div>
        <h1>
          Login
        </h1>
          <label> Email: </label> 
            <input type="text" name="email" value={this.state.email} onChange={this.onChangeEmail} />
          <label> Password: </label> 
            <input type="password" name="password" value={this.state.password} onChange={this.onChangePassword} /> 
          <button onClick={() => {this.submitForm()}}>Submit</button>
        </div>
        <div>
        <h1>
          Get user
        </h1>
          <button onClick={() => {this.getUser()}}>Submit</button>
        </div>
      </div>
    );
  }
}
