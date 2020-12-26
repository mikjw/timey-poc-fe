import React, { Component } from 'react';
import axios from 'axios';
export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      seconds: this.props.seconds,
      startTime: null,
      initialSeconds: null 
    }
    this.updateSeconds=this.updateSeconds.bind(this);
    this.startTimer=this.startTimer.bind(this);
  }

  componentDidMount() {
    console.log(this.props.id)
    console.log(this.state.id)
  }

  startTimer() {
    this.setState({
      initialSeconds: this.state.seconds,
      startTime: Math.round(Date.now() / 1000)
    })
    this.interval = setInterval(this.updateSeconds, 1000);
  }

  updateSeconds() {
    let secondsSinceStart = Math.round(Date.now() / 1000) - this.state.startTime;
    this.setState({
      seconds: this.state.initialSeconds + secondsSinceStart
    })
  }

  stopTime() {
    clearInterval(this.interval);
  }

  persistSeconds() {
    axios.post('http://localhost:5001/times/update')
      .then(response => {
        this.setState({ 
          times: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.title} : {this.state.seconds}
        </h3>
        <button onClick={() => { this.startTimer() }}>start</button>
        <button onClick={() => { this.stopTime() }}>stop</button>
      </div>
    );
  }
}